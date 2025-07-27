const Player = require("../entity/Player");

class PlayerSystem {
    constructor() {
        this.player = null;
    }
    init(camera) {
        // 初始化玩家
        this.player = new Player(8, 3.5, 8, camera);
    }
};

const PlayerSystemInstance = new PlayerSystem();

module.exports = PlayerSystemInstance;
