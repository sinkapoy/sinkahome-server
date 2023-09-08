import { Entity } from "@ash.ts/ash";
import { HomeSystem, homeEngine } from "@sinkapoy/home-core";

class DebugSystem extends HomeSystem {
    onInit(): void {
        this.setupEvent('writeGadgetProperty', this.onPropertyWrite);
    }

    onDestroy(): void {
        
    }

    onUpdate(dt: number): void {
        
    }

    onPropertyWrite = (entity: Entity, id: string, value: any)=>{
        console.log(`write property\n\tentity:${entity.name} id: ${id} value: ${value}`);
    }
}

homeEngine.addSystem(new DebugSystem(), Number.MAX_SAFE_INTEGER);