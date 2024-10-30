import { NodeList, Entity } from "@ash.ts/ash";
import { GadgetNode, HomeSystem, PropertiesComponent, PropertyAccessMode, serviceLocator, uuidT } from "@sinkapoy/home-core";

export class EntityUserNameSystem extends HomeSystem {

    private jsonPath = '';

    private aliases: Record<uuidT, string> = {};

    private gadgets: NodeList<GadgetNode>;

    async onInit() {
        const config = serviceLocator().get('config');
        const files = serviceLocator().get('files');
        this.jsonPath = files.join(config.get().configIntegrationFilesPath, 'user-names.json');
        if(await files.exist(this.jsonPath)){
            this.aliases = JSON.parse(await files.read(this.jsonPath) ?? '{}');
        }
        this.gadgets = this.setupNodeList({
            node: GadgetNode,
            onAdd: (node)=>{
                if(!this.aliases[node.entity.name]) return;
                const name = this.aliases[node.entity.name];
                this.setPropName(node.entity, name);
            },
        });

        let gadget = this.gadgets.head;
        while(gadget){
            if(this.aliases[gadget.entity.name]){
                const name = this.aliases[gadget.entity.name];
                this.setPropName(gadget.entity, name);
            }
            gadget = gadget.next;
        }

        this.setupEvent('writeGadgetProperty', (entity: Entity, propId: string, value: string)=>{
            if(propId !== 'user-name') return;
            this.setPropName(entity, value);

            this.aliases[entity.name] = value;
            serviceLocator().get('files').write(this.jsonPath, JSON.stringify(this.aliases));
        });
    }

    private setPropName(entity: Entity, name: string){
        const properties = entity.get(PropertiesComponent)!;
        let prop = properties.get('user-name');
        if(!prop){
            prop = properties.createPropertyFromJson({
                id: 'user-name',
                accessMode: PropertyAccessMode.rwn,
                value: '',
            });
        }
        prop.value = name;
        this.engine.emit('gadgetPropertyEvent', entity, prop);
    }

    onUpdate(dt: number): void {
        
    }

    onDestroy(): void {
        
    }
}