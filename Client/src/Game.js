const THREE = require('three');
const UI = require('./UI');
const Player = require('./Player');
const Map = require('./Map');
const AssetManager = require('./AssetManager');
const Control = require('./Control');
const Npc = require('./Npc');

class Game {
    static isRunning = false;
    static scene = new THREE.Scene();
    static camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    static renderer = new THREE.WebGLRenderer();
    static player = null;
    static npcs = [];
    static map = null;
    static control = null;
    static ui = null;
    static assetManager = null;
    static pointLight = null;
    static animationFrameId = null;

    static debug(msg) {
        this.ui.updateDebugPanel(msg);
    }

    static init() {
        // UI初始化
        this.ui = new UI(this);
        this.ui.init(
            this.onStart.bind(this),
            this.onExit.bind(this)
        );
        // 初始化玩家
        this.player = new Player(8, 3.5, 8, this.camera);

        // 初始化地图
        this.map = new Map(16);

        // 初始化渲染器
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);

        // 场景中加入光照
        {
            const ambientLight = new THREE.AmbientLight(0x606060);
            this.scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(10, 20, 10);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.set(1024, 1024);
            directionalLight.shadow.camera.near = 0.5;
            directionalLight.shadow.camera.far = 50;
            directionalLight.shadow.camera.left = -20;
            directionalLight.shadow.camera.right = 20;
            directionalLight.shadow.camera.top = 20;
            directionalLight.shadow.camera.bottom = -20;
            this.scene.add(directionalLight);
            this.pointLight = new THREE.PointLight(0xffffff, 0.3, 10);
            this.scene.add(this.pointLight);
            this.debug('Lighting initialized: Ambient(0x606060), Directional(0xffffff, 0.8), Point(0xffffff, 0.3)');
        }

        // 资源管理器
        this.assetManager = new AssetManager();
        // 加载资源
        this.assetManager.loadAssets(this.debug.bind(this)).catch(err => {
            this.debug(`Failed to load assets: ${err.message}`);
        });

        // 将场景绑定到地图对象
        this.map.init(this.scene);

        // 交互控制器
        this.control = new Control(this, this.player, this.map, this.scene, this.assetManager);
        this.ui.bindPlayBlockTypeSelectChange((value) => {
            this.control.setBlockType(value)
        });

        // 窗口大小改变
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // 游戏开始直接显示开始界面
        this.ui.showStartScreen();
    };

    // 玩家点击UI 开始按钮回调
    static async onStart() {
        console.log("点击开始按钮");
        // 保证资源加载完毕
        if (this.assetManager.texturesLoaded) {
            this.debug('Waiting for textures to load...');
            try {
                await this.assetManager.loadAssets(this.debug.bind(this));
            } catch (err) {
                this.debug(`Failed to start game: ${err.message}`);
                return;
            }
        }

        // 运行状态标记
        this.isRunning = true;
        // 显示局内UI
        this.ui.showInGameUI();
        // 初始化地面
        this.map.initTerrain(this.assetManager);

        // 初始化NPC
        this.npcs.length = 0;
        for (let i = 0; i < 3; i++) {
            const x = Math.floor(Math.random() * (this.map.size - 2)) + 1;
            const z = Math.floor(Math.random() * (this.map.size - 2)) + 1;
            const npc = new Npc(x, z, this.scene, this.assetManager.getMaterial(this.assetManager.materialNameMacro.NPC));
            this.npcs.push(npc);
            this.debug(`NPC ${this.npcs.length - 1} created at: x=${x}, y=1, z=${z}`);
        }

        // 初始化玩家
        this.player.position.set(8, 3.5, 8);
        this.player.targetRotation.x = 0;
        this.player.targetRotation.y = 0;
        this.player.currentRotation.x = 0;
        this.player.currentRotation.y = 0;
        this.camera.position.copy(this.player.position);
        this.pointLight.position.set(this.player.position.x, this.player.position.y + 0.5, this.player.position.z);

        this.debug('Game started');

        // 开始主循环
        this.mainLoop();
    }

    // 玩家点击UI 结束退出按钮回调
    static async onExit() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationFrameId);
        this.ui.showStartScreen();
        this.map.clearAllBlocks();
        this.npcs.forEach(npc => npc.remove(this.scene));
        this.npcs.length = 0;
        this.player.position.set(8, 3.5, 8);
        this.player.velocity.set(0, 0, 0);
        this.debug('Game exited');
    }

    // 游戏主循环
    static async mainLoop() {
        if (!this.isRunning) return;
        this.animationFrameId = requestAnimationFrame(this.mainLoop.bind(this));

        this.player.update(this.map, this.control.keys, this.debug.bind(this));
        this.npcs.forEach((npc, index) => npc.update(this.map, this.map.size, msg => this.debug(`NPC ${index}: ${msg}`)));
        this.pointLight.position.set(this.player.position.x, this.player.position.y + 0.5, this.player.position.z);
        this.control.updateBlockHighlight();
        try {
            this.renderer.render(this.scene, this.camera);
        } catch (err) {
            this.debug(`Render error: ${err.message}`);
            console.error('Render error details:', err);
        }
    }

};

module.exports = Game;