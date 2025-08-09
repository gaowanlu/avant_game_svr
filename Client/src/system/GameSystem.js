const THREE = require("three");

const UISystem = require("./UISystem");
const PlayerSystem = require("./PlayerSystem");
const MapSystem = require("./MapSystem");
const AssetSystem = require("./AssetSystem");
const ControlSystem = require("./ControlSystem");
const NpcSystem = require("./NpcSystem");
const BlockSystem = require("./BlockSystem");
const Network = require("../base/Network");

class GameSystem {
    constructor() {
        this.isRunning = false;

        this.animationFrameId = null;
        // 记录上一帧时间
        this.lastTime = performance.now();
        this.network = null;
        this.svrHost = "www.mfavant.xyz";
        this.svrPort = 443;
    }

    debugMsg(msg) {
        UISystem.updateDebugPanel(msg);
    }

    init() {
        UISystem.init();
        PlayerSystem.init(this.camera);
        MapSystem.init();
        BlockSystem.init();
        NpcSystem.init();
        AssetSystem.loadAssets().catch(err => {
            this.debugMsg(`Failed to load assets: ${err.message}`);
        });

        ControlSystem.init();

        this.windowEventInit();

        UISystem.showStartScreen();
        this.network = new Network(this.svrHost, this.svrPort);
        this.network.connect();
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
        UISystem.OnGameStart();
        MapSystem.OnGameStart();
        BlockSystem.OnGameStart();
        NpcSystem.OnGameStart();
        PlayerSystem.OnGameStart();
        MapSystem.SetPointLightPosition(PlayerSystem.GetPlayerPosition().x,
            PlayerSystem.GetPlayerPosition().y + 0.5,
            PlayerSystem.GetPlayerPosition().z);
        ControlSystem.OnGameStart();

        // 开始主循环
        this.lastTime = performance.now();
        this.mainLoop();
    }

    windowEventInit() {
        // 窗口大小改变
        window.addEventListener('resize', () => {
            // this.camera.aspect = window.innerWidth / window.innerHeight;
            // this.camera.updateProjectionMatrix();
            // this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // 玩家点UI 结束退出按钮回调
    static async OnExit() {
        setIsRunning(false);
        cancelAnimationFrame(this.animationFrameId);

        UISystem.OnGameExit();
        MapSystem.OnGameExit();
        BlockSystem.OnGameExit();

        NpcSystem.OnGameExit();
        PlayerSystem.OnGameExit();
        ControlSystem.OnGameExit();

        console.debug('Game OnExit');
    }

    static async mainLoop() {
        if (!this.isRunning) {
            console.debug("!this.isRunning");
            return;
        }

        this.animationFrameId = requestAnimationFrame(this.mainLoop.bind(this));

        // 计算时间步长秒
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // 毫秒转为秒
        this.lastTime = currentTime;

        PlayerSystem.OnMainLoop();
        NpcSystem.OnMainLoop();
        MapSystem.OnMainLoop();
        ControlSystem.OnMainLoop();

        // 调试帧率
        this.debug(`Frame time: ${(deltaTime * 1000).toFixed(2)}ms, FPS: ${(1 / deltaTime).toFixed(1)}`);
    }
};

const GameSystemInstance = new GameSystem();

module.exports = GameSystemInstance;
