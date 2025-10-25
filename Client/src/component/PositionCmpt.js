const Component = require("../base/Component");
const THREE = require('three');

class PositionCmpt extends Component {
    constructor(x, y, z) {
        super(PositionCmpt);
        this.position = new THREE.Vector3(x, y, z);
    }

    GetThreePosition() {
        return this.position;
    }

    GetX() {
        return this.position.x;
    }

    GetY() {
        return this.position.y;
    }

    GetZ() {
        return this.position.z;
    }

    SetX(x) {
        this.position.x = x;
    }

    SetY(y) {
        this.position.y = y;
    }

    SetZ(z) {
        this.position.z = z;
    }
};

module.exports = PositionCmpt;
