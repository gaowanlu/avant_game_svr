const Player = require("../entity/Player");

class PlayerSystem {
    constructor() {
        this.player = null;
    }
    Init(camera) {
        console.log("PlayerSystem.Init()");
        this.player = new Player(8, 3.5, 8, camera);
    }

    OnGameStart() {
        console.log("PlayerSystem.OnGameStart()");

        // 游戏开始时设置位置玩家参数
        this.player.SetPosition(8, 3.5, 8);
        this.player.SetTargetRotation(0, 0);
        this.player.SetCurrentRotation(0, 0);
        this.player.UpdateCameraPositionToPlayerPosition();
    }

    GetPlayerPosition() {
        return this.player.positionCmpt.GetThreePosition();
    }

    GetPlayerPositionX() {
        return this.player.positionCmpt.GetThreePosition().x;
    }

    GetPlayerPositionY() {
        return this.player.positionCmpt.GetThreePosition().y;
    }

    GetPlayerPositionZ() {
        return this.player.positionCmpt.GetThreePosition().z;
    }

    OnGameExit() {
        console.log("PlayerSystem.OnGameExit()");

        this.player.SetPosition(8, 3.5, 8);
        this.player.SetVelocity(0, 0, 0);
    }

    OnMainLoop() {
        console.log("PlayerSystem.OnMainLoop()");

        // this.player.Update(this.map, this.control.keys, this.debug.bind(this));
    }
};

const PlayerSystemInstance = new PlayerSystem();

module.exports = PlayerSystemInstance;
