const Entity = require("../base/Entity");
const PositionCmpt = require("../component/PositionCmpt");

class Block extends Entity {
    constructor(x, y, z, blockType, material) {
        super();
        super.addComponent(new PositionCmpt());
        this.blockType = blockType;
        this.material = material;

        // 创建并初始化一个3D网格对象Mesh表示场景中的一个立方体方块
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        this.mesh.position.set(x, y, z);
        this.mesh.name = `${x},${y},${z}`;
        this.mesh.isBlock = true;
        // 使该方块能够投射阴影到其他对象上
        this.mesh.castShadow = true;
        // 使该方块能够接收其他对象投射的阴影
        this.mesh.receiveShadow = true;
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    removeFromScene(scene) {
        scene.remove(this.mesh);
    }
};

module.exports = Block;
