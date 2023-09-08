
import { configureNetworking } from "@sinkapoy/home-integrations-networking";
import { homeEngine } from "@sinkapoy/home-core";
import { configureSinkapoySerialModule } from "@sinkapoy/home-integrations-sinkapoy-serial";
import "@sinkapoy/home-integrations-server-widgets";
import "@sinkapoy/home-integrations-scripts";
import "./ecs/systems/DebugSystem";

configureNetworking({port: 18956});
configureSinkapoySerialModule();

let prevTime = Date.now();
const tick = async () => {
    const now = Date.now();
    const dt = now - prevTime;
    homeEngine.update(dt);
    prevTime = now;
    await new Promise<void>((resolve) => setTimeout(() => {
        setImmediate(tick);
        resolve()
    }, 5));

}
tick();