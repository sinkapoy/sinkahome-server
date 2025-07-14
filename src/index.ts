import { EntityUserNameSystem } from './ecs/systems/EntityUserNameSystem';
import { configureNetworking } from '@sinkapoy/home-integrations-networking';
import { homeEngine } from '@sinkapoy/home-core';
import '@sinkapoy/home-integrations-sinkapoy-serial';
import '@sinkapoy/home-integrations-server-widgets';
import '@sinkapoy/home-integrations-scripts';
import '@sinkapoy/home-integrations-miot';
import './ecs/systems/DebugSystem';
import '@sinkapoy/home-integrations-zigbee';
import '@sinkapoy/home-integrations-air-systems';
import '@sinkapoy/home-integrations-ai';


const errorfunc = console.error;
console.error = (...args)=>{
    errorfunc.call(console, 'ERROR:', ...args);
};

process.on('uncaughtException', function (err) {       
    console.error(err);
    //Send some notification about the error  
    process.exit(1);
});

configureNetworking({ port: 18956 });

homeEngine.addSystem(new EntityUserNameSystem(), Number.MAX_SAFE_INTEGER);

let prevTime = Date.now();
const tick = async () => {
    const now = Date.now();
    const dt = now - prevTime;
    try {
        homeEngine.update(dt);
    } catch (e) {
        console.error('error doing step', e);
    }

    prevTime = now;
    await new Promise<void>((resolve) => setTimeout(() => {
        setImmediate(tick);
        resolve();
    }, 5));
};
tick();
