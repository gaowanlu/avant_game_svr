const Block = require('./Block.js');

class Map {
    constructor(size) {
        this.size = size;
        this.blocks = {};
        this.scene = null;
    }

    // 初始化地图传入Three.js场景
    init(scene) {
        this.scene = scene;
    }

    // 加入块到地图
    setBlock(x, y, z, blockType, material) {
        const key = `${x},${y},${z}`;
        this.blocks[key] = new Block(x, y, z, blockType, material);
        // 将块加入到目标场景中
        this.blocks[key].addToScene(this.scene);
    };

    // 获取地图中的某个块
    getBlock(x, y, z) {
        return this.blocks[`${x},${y},${z}`] || null;
    }

    // 从地图中删除某个块
    removeBlock(x, y, z) {
        const key = `${x},${y},${z}`;
        if (this.blocks[key]) {
            // 从场景移除
            this.blocks[key].removeFromScene(this.scene);
            // 从地图移除
            delete this.blocks[key];
        }
    }

    // 初始化基础地面
    initTerrain(assetManager) {
        for (let x = 0; x < this.size; x++) {
            for (let z = 0; z < this.size; z++) {
                this.setBlock(x, 0, z,
                    assetManager.materialNameMacro.DIRT_TERRAIN,
                    assetManager.getMaterial(assetManager.materialNameMacro.DIRT_TERRAIN));
            }
        }
    }

    // 清空地图所有块
    clearAllBlocks() {
        Object.keys(this.blocks).forEach(key => this.blocks[key].removeFromScene(this.scene));
        this.blocks = {};
    }
};

module.exports = Map;