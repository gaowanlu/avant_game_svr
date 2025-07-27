const Component = require("../base/Component");

class CameraCmpt extends Component {
    constructor(camera) {
        super(CameraCmpt);
        this.camera = camera;
    }
    getCamera() {
        return this.camera;
    }
    setPosition(position) {
        this.camera.position.copy(position);
    }
};

module.exports = CameraCmpt;
