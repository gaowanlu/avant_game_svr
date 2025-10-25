const Entity = require("../base/Entity");
const Block = require("./Block");
const PositionCmpt = require("../component/PositionCmpt");
const AssetSystemInstance = require("../system/AssetSystem");
const Macro = require("../base/Macro");

class Map extends Entity {
    constructor(size) {
        super();
        this.size = size;
        this.blocks = {};
        this.threeScene = null;
    }

    destroy() {
        super.destroy();
    }

    // 初始化地图传入Three.js场景
    init(scene) {
        this.threeScene = scene;
    }

    getBlockKey(x, y, z) {
        return `${z},${y},${z}`;
    }

    // 加入新的块到地图
    setBlock(blockObj) {
        const x = blockObj.getComponent(PositionCmpt).getX();
        const y = blockObj.getComponent(PositionCmpt).getY();
        const z = blockObj.getComponent(PositionCmpt).getZ();
        const key = this.getBlockKey(x, y, z);
        this.blocks[key] = blockObj;
        // 将块加入到目标场景中
        this.blocks[key].addToScene(this.threeScene);
    }

    // 获取地图中的某个Block
    getBlock(x, y, z) {
        const key = this.getBlockKey(x, y, z);
        return this.blocks[key] || null;
    }

    // 从地图中删除某个块
    removeBlock(x, y, z) {
        const key = this.getBlockKey(x, y, z);
        if (this.blocks[key]) {
            // 从场景中移除
            this.blocks[key].removeFromScene(this.threeScene);
            this.blocks[key].destroy();
            // 从地图移除
            delete this.blocks[key];
        }
    }

    // 初始化基础地面
    initTerrain() {
        console.log("Map.initTerrain()");
        for (let x = 0; x < this.size; ++x) {
            for (let z = 0; z < this.size; ++z) {
                let newTerrainBlock = new Block(x,
                    0,
                    z,
                    Macro.materialNameMacro.DIRT_TERRAIN,
                    AssetSystemInstance.getMaterial(Macro.materialNameMacro.DIRT_TERRAIN));
                this.setBlock(newTerrainBlock);
            }
        }
    }

    // 清空地图所有块
    clearAllBlocks() {
        Object.keys(this.blocks).forEach(key => {
            this.blocks[key].destroy();
            this.blocks[key].removeFromScene(this.threeScene);
        });
        this.blocks = {};
    }

};

module.exports = Map;
