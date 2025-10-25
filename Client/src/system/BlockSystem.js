class BlockSystem {
    constructor() {
    }

    Init() {
        console.log("BlockSystem.Init()");
    }

    OnGameStart() {
        console.log("BlockSystem.OnGameStart()");
    }

    OnGameExit() {
        console.log("BlockSystem.OnGameExit()");
    }

    OnMainLoop() {
        console.log("BlockSystem.OnMainLoop()");
    }
};

const BlockSystemInstance = new BlockSystem();

module.exports = BlockSystemInstance;
