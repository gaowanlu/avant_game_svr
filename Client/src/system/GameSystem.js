const THREE = require("three");

const UISystem = require("./UISystem");
const PlayerSystem = require("./PlayerSystem");
const MapSystem = require("./MapSystem");
const AssetSystem = require("./AssetSystem");
const ControlSystem = require("./ControlSystem");
const NpcSystem = require("./NpcSystem");
const BlockSystem = require("./BlockSystem");
const Network = require("../base/Network");
const BaseConfig = require("../config/BaseConfig");

class GameSystem {
    constructor() {
        // 是否在运行中标记
        this.isRunning = false;
        // 帧ID
        this.animationFrameId = null;
        // 记录上一帧时间
        this.lastTime = performance.now();

        // 网络
        this.network = new Network(BaseConfig.svrHost, BaseConfig.svrPort);
    }

    init() {
        // 网络初始化
        this.network.connect();
        // UI初始化
        UISystem.init(() => {
            this.OnStart();
        }, () => {
            this.OnExit();
        });
        UISystem.showStartScreen();

        // 地图场景系统初始化
        MapSystem.init();

        // 玩家角色系统初始化
        PlayerSystem.init(MapSystem.getCamera());

        // 砖块系统初始化
        BlockSystem.init();

        // Npc小人系统初始化
        NpcSystem.init();

        // 素材系统初始化
        AssetSystem.loadAssets().catch(err => {
            console.error(`Failed to load assets: ${err.message}`);
        });

        // 控制系统初始化
        ControlSystem.init();
    }

    setIsRunning(val) {
        this.isRunning = val;
    }

    // 玩家点击UI 开始按钮
    async OnStart() {
        console.log("游戏开始");

        // 保证资源加载完毕
        if (!AssetSystem.isLoadedOK()) {
            console.error("资源暂未加载完毕");
            return;
        }

        this.setIsRunning(true);

        // 显示局内UI
        // UISystem.OnGameStart();
        // MapSystem.OnGameStart();
        // BlockSystem.OnGameStart();
        // NpcSystem.OnGameStart();
        // PlayerSystem.OnGameStart();
        // MapSystem.SetPointLightPosition(PlayerSystem.GetPlayerPosition().x,
        //     PlayerSystem.GetPlayerPosition().y + 0.5,
        //     PlayerSystem.GetPlayerPosition().z);
        // ControlSystem.OnGameStart();

        // 开始主循环
        this.lastTime = performance.now();
        this.mainLoop();
    }

    // 玩家点UI 结束退出按钮回调
    async OnExit() {
        console.log('Game OnExit');
        this.setIsRunning(false);

        // cancelAnimationFrame(this.animationFrameId);

        // UISystem.OnGameExit();
        // MapSystem.OnGameExit();
        // BlockSystem.OnGameExit();

        // NpcSystem.OnGameExit();
        // PlayerSystem.OnGameExit();
        // ControlSystem.OnGameExit();
    }

    async mainLoop() {
        if (!this.isRunning) {
            console.log("!this.isRunning");
            return;
        }

        this.animationFrameId = requestAnimationFrame(this.mainLoop.bind(this));

        // 计算时间步长秒
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // 毫秒转为秒
        this.lastTime = currentTime;

        // PlayerSystem.OnMainLoop();
        // NpcSystem.OnMainLoop();
        // MapSystem.OnMainLoop();
        // ControlSystem.OnMainLoop();

        // 调试帧率
        console.log(`Frame time: ${(deltaTime * 1000).toFixed(2)}ms, FPS: ${(1 / deltaTime).toFixed(1)}`);
    }
};

const GameSystemInstance = new GameSystem();

module.exports = GameSystemInstance;
