const Component = require("../base/Component");

class CameraCmpt extends Component {
    constructor(camera) {
        super(CameraCmpt);
        this.camera = camera;
    }
    GetCamera() {
        return this.camera;
    }
    SetPosition(position) {
        this.camera.position.copy(position);
    }
};

module.exports = CameraCmpt;
