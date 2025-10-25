const Npc = require("../entity/Npc");

class NpcSystem {
    constructor() {
        this.npcs = [];
    }
    init() {
        console.log("NpcSystem.init()");
    }

    OnGameStart() {
        console.log("NpcSystem.OnGameStart()");
        this.npcs.length = 0;
        // for (let i = 0; i < 3; i++) {
        //     const x = Math.floor(Math.random() * (this.map.size - 2)) + 1;
        //     const z = Math.floor(Math.random() * (this.map.size - 2)) + 1;
        //     const npc = new Npc(x, z, this.scene, this.assetManager.getMaterial(this.assetManager.materialNameMacro.NPC));
        //     this.npcs.push(npc);
        //     this.debug(`NPC ${this.npcs.length - 1} created at: x=${x}, y=1, z=${z}`);
        // }
    }

    OnGameExit() {
        // this.npcs.forEach(npc => npc.remove(this.scene));
        // this.npcs.length = 0;
    }

    OnMainLoop() {
        // this.npcs.forEach((npc, index) => npc.update(this.map, this.map.size, msg => this.debug(`NPC ${index}: ${msg}`)));
    }
};

const NpcSystemInstance = new NpcSystem();

module.exports = NpcSystemInstance;
