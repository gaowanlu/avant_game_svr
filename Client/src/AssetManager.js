const THREE = require('three');

class AssetManager {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.materials = {};
        this.textures = {};
        // 用于记录管理的textures是否全部加载完毕
        this.texturesLoaded = false;

        this.textureNameMacro = {
            GRASS_TOP: 'GrassTop',
            GRASS_SIDE: 'GrassSide',
            DIRT: 'Dirt'
        };

        this.materialNameMacro = {
            GRASS_TERRAIN: 'GrassTerrain',
            DIRT_TERRAIN: 'DirtTerrain',
            TEXTURED_GRASS: 'TexturedGrass',
            TEXTURED_DIRT: 'TexturedDirt',
            TEXTURED_STONE: 'TexturedStone',
            OUTLINE: 'Outline',
            NPC: 'NPC'
        };
    }

    loadAssets(debugCallbackFunc) {
        return new Promise((resolve, reject) => {
            let loadedCount = 0;

            const resources = [
                { name: this.textureNameMacro.GRASS_TOP, path: 'assets/grass_block_top.png' },
                { name: this.textureNameMacro.GRASS_SIDE, path: 'assets/grass_block_side.png' },
                { name: this.textureNameMacro.DIRT, path: 'assets/dirt.png' }
            ];

            const onLoad = (textureName, texture) => {
                debugCallbackFunc(`${textureName} texture loaded`);
                loadedCount++;
                if (loadedCount === resources.length) {
                    this.texturesLoaded = true;
                    // 当textxture加载完成后，开始初始化材质
                    this.initializeMaterials(debugCallbackFunc);
                    resolve();
                }
            };

            const onError = (textureName, error) => {
                debugCallbackFunc(`Error loading ${textureName} texture: ${err.message}`);
                reject(err);
            };

            for (let resource of resources) {
                this.textures[resource.name] = this.textureLoader.load(resource.path,
                    (texture) => onLoad(resource.name, texture),
                    undefined,
                    (err) => onError(resource.name, err)
                )
            }

            Object.values(this.textures).forEach(texture => {
                // 纹理放大过滤器 THREE.NearestFilter适合像素风
                texture.magFilter = THREE.NearestFilter;
                // 纹理缩小过滤器
                texture.minFilter = THREE.NearestFilter;
            });
        });
    }

    initializeMaterials(debugCallbackFunc) {
        this.materials[this.materialNameMacro.GRASS_TERRAIN] = new THREE.MeshLambertMaterial({ color: 0x4CAF50 });
        this.materials[this.materialNameMacro.DIRT_TERRAIN] = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        this.materials[this.materialNameMacro.TEXTURED_GRASS] = new THREE.MeshLambertMaterial({ map: this.textures[this.textureNameMacro.GRASS_SIDE] });
        this.materials[this.materialNameMacro.TEXTURED_DIRT] = new THREE.MeshLambertMaterial({ map: this.textures[this.textureNameMacro.DIRT] });
        this.materials[this.materialNameMacro.TEXTURED_STONE] = new THREE.MeshLambertMaterial({ map: this.textures[this.textureNameMacro.GRASS_TOP] });
        this.materials[this.materialNameMacro.OUTLINE] = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        this.materials[this.materialNameMacro.NPC] = new THREE.LineBasicMaterial({ color: 0xff0000 });
    }

    getMaterial(type) {
        if (!this.materials[type]) {
            console.error("no such material: " + type);
        }
        return this.materials[type];
    }
};

module.exports = AssetManager;
