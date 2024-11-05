# sinkahome-server

This is a smart home system written in TypeScript. It is designed with a modular structure, where the core component is an ECS framework with the main engine. All smart devices are considered as **gadgets** within this engine. Each gadget has **properties**, **actions** that can be triggered by broadcast messages, and **events** that are broadcasted throughout the entire engine.

The engine initializes various systems that interact with gadgets and other components. These systems can also serve as drivers for different interfaces and protocols, providing a user-friendly API through the gadget interface (similar to the facade pattern). For instance, the @sinkapoy/home-integrations-sinkapoy-serial system works with STM controllers connected via USB. These controllers have a specific protocol for interacting with pin IO. This protocol is converted by multiple systems into gadgets and their properties. Therefore, within the smart home engine, we interact with gadgets, while the sinkapoy-serial systems work with both gadgets and STM controller entities.

## integrations
 - MiHome - full support for properties, partial for actions (can be invoked with args with no return), no support for events (planned). Have initial support for cloud devices (just scrobling for local devices).
 - zigbee - done through [zhm](https://github.com/Koenkk/zigbee-herdsman), full support for simple devices like switches, plugs, presence sensors and dimmers, tested on Tuya gadgets. All devices which work in Home Assistant should work in this smart home system.
 - server widgets - switches, folders and bindings to gadget properties
 - sinkahome-serial - support for my own relay and input modules based on stm32 microcontrollers
