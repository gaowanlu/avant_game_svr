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
        // this.map.clearAllBlocks();
    }
};

const BlockSystemInstance = new BlockSystem();

module.exports = BlockSystemInstance;
