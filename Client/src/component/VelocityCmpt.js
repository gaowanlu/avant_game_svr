const Component = require("../base/Component");
const THREE = require('three');

class VelocityCmpt extends Component {
    constructor() {
        super(VelocityCmpt);
        this.velocity = new THREE.Vector3(0, 0, 0);
    }

    GetThreeVelocity() {
        return this.velocity;
    }

    SetVelocity(x, y, z) {
        this.velocity.x = x;
        this.velocity.y = y;
        this.velocity.z = z;
    }
};

module.exports = VelocityCmpt;
