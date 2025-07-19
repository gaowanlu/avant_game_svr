const Component = require("../base/Component");
const THREE = require('three');

class PositionCmpt extends Component {
    constructor(x, y, z) {
        super(PositionCmpt);
        this.position = new THREE.Vector3(x, y, z);
    }

    getThreePosition() {
        return this.position;
    }

    getX() {
        return this.position.x;
    }

    getY() {
        return this.position.y;
    }

    getZ() {
        return this.position.z;
    }
};

module.exports = PositionCmpt;
