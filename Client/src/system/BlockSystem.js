class BlockSystem {
    constructor() {
    }

    init() {
        console.log("BlockSystem.init()");
    }

    OnGameStart() {
        console.log("BlockSystem.OnGameStart()");
    }

    OnGameExit() {
        console.log("BlockSystem.OnGameExit()");
        // this.map.clearAllBlocks();
    }

    OnMainLoop() {
        console.log("BlockSystem.OnMainLoop()");
    }
};

const BlockSystemInstance = new BlockSystem();

module.exports = BlockSystemInstance;
