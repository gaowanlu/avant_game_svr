const Player = require("../entity/Player");

class PlayerSystem {
    constructor() {
        this.player = null;
    }
    init(camera) {
        console.log("PlayerSystem.init()");
        this.player = new Player(8, 3.5, 8, camera);
    }

    OnGameStart() {
        console.log("PlayerSystem.OnGameStart()");

        // 游戏开始时设置位置玩家参数
        this.player.setPosition(8, 3.5, 8);
        this.player.setTargetRotation(0, 0);
        this.player.setCurrentRotation(0, 0);
        this.player.UpdateCameraPositionToPlayerPosition();
    }

    GetPlayerPosition() {
        return this.player.positionCmpt.getThreePosition();
    }

    GetPlayerPositionX() {
        return this.player.positionCmpt.getThreePosition().x;
    }

    GetPlayerPositionY() {
        return this.player.positionCmpt.getThreePosition().y;
    }

    GetPlayerPositionZ() {
        return this.player.positionCmpt.getThreePosition().z;
    }

    OnGameExit() {
        // this.player.position.set(8, 3.5, 8);
        // this.player.velocity.set(0, 0, 0);
    }

    OnMainLoop() {
        // this.player.update(this.map, this.control.keys, this.debug.bind(this));
    }
};

const PlayerSystemInstance = new PlayerSystem();

module.exports = PlayerSystemInstance;
