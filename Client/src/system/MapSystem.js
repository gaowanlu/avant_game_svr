const Map = require("../entity/Map");
const { Sky } = require('three/examples/jsm/objects/Sky.js');
const GameSystem = require("./GameSystem");
const THREE = require('three');

class MapSystem {
    constructor() {
        this.map = null;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.pointLight = null;
    }

    init() {
        console.log("MapSystem.init()");
        this.map = new Map(16);

        // 初始化渲染器
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
        // 天空与光照
        {
            const sky = new Sky();
            sky.scale.setScalar(10000); // Large scale to cover the scene
            this.scene.add(sky);

            // Configure sky parameters for a deeper blue and less white horizon
            const uniforms = sky.material.uniforms;
            uniforms['turbidity'].value = 2; // Reduced for less haze
            uniforms['rayleigh'].value = 3; // Increased for deeper blue
            uniforms['mieCoefficient'].value = 0.01; // Adjusted for balanced scattering
            uniforms['mieDirectionalG'].value = 0.7; // Reduced to soften sun halo

            // Set sun position to match directional light
            const sun = new THREE.Vector3();
            const phi = THREE.MathUtils.degToRad(90 - 20); // Match directional light angle
            const theta = THREE.MathUtils.degToRad(45); // Arbitrary azimuth
            sun.setFromSphericalCoords(1, phi, theta);
            uniforms['sunPosition'].value.copy(sun);

            // Existing lighting code
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
            console.log('Lighting and sky initialized: Ambient(0x606060), Directional(0xffffff, 0.8), Point(0xffffff, 0.3), Sky(deep blue)');
        }

        // 将场景绑定到地图对象
        this.map.init(this.scene);
    }

    // OnGameStart
    OnGameStart() {
        console.log("MapSystem.OnGameStart()");
        this.map.initTerrain();
    }

    OnGameExit() {

    }

    OnMainLoop(playerPosition) {
        // this.pointLight.position.set(this.player.position.x, this.player.position.y + 0.5, this.player.position.z);

        // try {
        //     this.renderer.render(this.scene, this.camera);
        // } catch (err) {
        //     this.debug(`Render error: ${err.message}`);
        //     console.error('Render error details:', err);
        // }
    }

    getCamera() {
        return this.camera;
    }

    SetPointLightPosition(x, y, z) {
        console.log(`MapSystem.SetPointLightPosition(${x}, ${y}, ${z})`);
        this.pointLight.position.set(x, y, z);
    }
};

const MapSystemInstance = new MapSystem();

module.exports = MapSystemInstance;
