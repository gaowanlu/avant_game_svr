const THREE = require("three");

const UISystem = require("./UISystem");
const PlayerSystem = require("./PlayerSystem");
const MapSystem = require("./MapSystem");
const AssetSystem = require("./AssetSystem");
const ControlSystem = require("./ControlSystem");
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

    // 玩家点击UI 开始按钮
    async OnStart() {
        console.log("游戏开始");

        // 保证资源加载完毕
        if (!AssetSystem.isLoadedOK()) {
            console.error("资源暂未加载完毕");
            return;
        }

        this.isRunning = true;
        // 显示局内UI
        UISystem.showInGameUI();
        MapSystem.OnGameStart();
    }

    windowEventInit() {
        // 窗口大小改变
        window.addEventListener('resize', () => {
            // this.camera.aspect = window.innerWidth / window.innerHeight;
            // this.camera.updateProjectionMatrix();
            // this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
};

const GameSystemInstance = new GameSystem();

module.exports = GameSystemInstance;
