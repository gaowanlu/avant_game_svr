const THREE = require('three');

class Block {
    constructor(x, y, z, type, material, isTerrain = false) {
        this.position = new THREE.Vector3(x, y, z);
        this.type = type;
        // 创建并初始化一个3D网格对象Mesh表示场景中的一个立方体方块
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        this.mesh.position.set(x, y, z);
        this.mesh.name = `${x},${y},${z}`;
        this.mesh.isBlock = true;
        // 非地形方块
        if (!isTerrain) {
            // 使该方块能够投射阴影到其他对象上
            this.mesh.castShadow = true;
            // 使该方块能够接收其他对象投射的阴影
            this.mesh.receiveShadow = true;
        }
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    removeFromScene(scene) {
        scene.remove(this.mesh);
    }
};

module.exports = Block;