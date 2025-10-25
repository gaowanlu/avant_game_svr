const Npc = require("../entity/Npc");
const MapSystem = require("./MapSystem");
const AssetSystem = require("./AssetSystem");
const Macro = require("../base/Macro");

class NpcSystem {
    constructor() {
        this.npcs = [];
    }
    Init() {
        console.log("NpcSystem.Init()");
    }

    OnGameStart() {
        console.log("NpcSystem.OnGameStart()");
        this.npcs.length = 0;
        for (let i = 0; i < 3; i++) {
            const x = Math.floor(Math.random() * (MapSystem.GetMapSize() - 2)) + 1;
            const z = Math.floor(Math.random() * (MapSystem.GetMapSize() - 2)) + 1;

            const npc = new Npc(x,
                z,
                MapSystem.GetScene(),
                AssetSystem.GetMaterial(Macro.MaterialNameMacro.NPC));
            this.npcs.push(npc);

            console.log(`NPC ${this.npcs.length - 1} created at: x=${x}, y=1, z=${z}`);
        }
    }

    OnGameExit() {
        console.log("NpcSystem.OnGameExit()");

        this.npcs.forEach(npc => npc.Remove(MapSystem.GetScene()));
        this.npcs.length = 0;
    }

    OnMainLoop() {
        console.log("NpcSystem.OnMainLoop()");

        this.npcs.forEach((npc, index) => {
            npc.Update(MapSystem.GetMap(),
                MapSystem.GetMapSize(),
                (msg) => { console.log(`NPC ${index}: ${msg}`) });
        });
    }
};

const NpcSystemInstance = new NpcSystem();

module.exports = NpcSystemInstance;
