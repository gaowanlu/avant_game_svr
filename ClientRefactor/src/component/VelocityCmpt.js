const Component = require("../base/Component");
const THREE = require('three');

class VelocityCmpt extends Component {
    constructor() {
        super(VelocityCmpt);
        this.velocity = new THREE.Vector3(0, 0, 0);
    }

    getThreeVelocity() {
        return this.velocity;
    }
};

module.exports = VelocityCmpt;
