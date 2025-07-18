const THREE = require('three');

// Base class for game entities
class Actor {
    constructor(x, y, z) {
        this.position = new THREE.Vector3(x, y, z);
        this.velocity = new THREE.Vector3(0, 0, 0);
    }

    // 由派生类实现
    update(map, worldSize) {
    }
};

module.exports = Actor;
