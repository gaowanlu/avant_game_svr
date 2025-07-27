const Entity = require("../base/Entity");
const THREE = require("three");
const PositionCmpt = require("../component/PositionCmpt");
const CameraCmpt = require("../component/CameraCmpt");
const VelocityCmpt = require("../component/VelocityCmpt");

class Player extends Entity {
    constructor(x, y, z, camera) {
        super();
        this.positionCmpt = new PositionCmpt(x, y, z);
        this.addComponent(this.positionCmpt);
        this.cameraCmpt = new CameraCmpt(camera);
        this.addComponent(this.cameraCmpt);
        this.velocityCmpt = new VelocityCmpt();
        this.addComponent(this.velocityCmpt);

        this.height = 1.8;
        this.width = 0.4;
        this.speed = 0.0717;
        this.jumpStrength = 0.2;
        this.gravity = -0.01;
        this.targetRotation = { x: 0, y: 0 };
        this.currentRotation = { x: 0, y: 0 };

        // 提高平滑银子，加快旋转响应
        this.rotationSmoothing = 0.3;
        // 鼠标灵敏度参数
        this.mouseSensitivity = 0.002;
        // 设置相机位置
        this.cameraCmpt.setPosition(this.positionCmpt.getThreePosition());
    }

    destroy() {
        super.destroy();
    }

    canMoveTo(x, y, z, map) {
        const feet = Math.floor(y - this.height);
        const head = Math.floor(y);
        const checkX = Math.floor(x);
        const checkZ = Math.floor(z);

        const feetBlock = y > this.height + 0.1 ? map.getBlock(checkX, feet, checkZ) : null;
        const headBlock = map.getBlock(checkX, head, checkZ);
        if (feetBlock || headBlock) {
            return false;
        }
        return true;
    }

    updateRotation(event, debugCallbackFunc) {
        // 提高灵敏度，加快视角旋转
        this.targetRotation.y -= event.movementX * this.mouseSensitivity;
        this.targetRotation.x -= event.movementY * this.mouseSensitivity;
        this.targetRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.targetRotation.x));
        const pitchDeg = (this.targetRotation.x * 180 / Math.PI).toFixed(1);
        const yawDeg = (this.targetRotation.y * 180 / Math.PI).toFixed(1);
        if (debugCallbackFunc) {
            debugCallbackFunc(`Camera rotation: pitch=${pitchDeg}°, yaw=${yawDeg}°`);
        }
    }


    update(map, keys, debugCallbackFunc) {
        this.velocityCmpt.getThreeVelocity().y += this.gravity;

        this.positionCmpt.getThreePosition().position.add(this.velocityCmpt.getThreeVelocity());

        // 地面碰撞检测
        if (this.positionCmpt.getThreePosition().y < this.height) {
            this.positionCmpt.getThreePosition().y = this.height;
            this.velocityCmpt.getThreeVelocity().y = 0;
        }

        // 跳跃逻辑：仅当玩家在地面上时允许跳跃
        // if (keys['Space'] && this.getComponent(PositionCmpt).getThreePosition().y <= this.height) {
        //     this.velocityCmpt.getThreeVelocity().y = this.jumpStrength;
        //     debugCallbackFunc('Player jumped');
        // }
        if (keys['Space']) {
            this.velocityCmpt.getThreeVelocity().y = this.jumpStrength;
            debugCallbackFunc('Player jumped');
        }

        const direction = new THREE.Vector3();
        if (keys['KeyW']) direction.z -= 1;
        if (keys['KeyS']) direction.z += 1;
        if (keys['KeyA']) direction.x -= 1;
        if (keys['KeyD']) direction.x += 1;

        if (direction.length() > 0) {
            direction.normalize();
            // 使用 targetRotation.y 替代 currentRotation.y，移除平滑延迟
            const move = direction.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), this.targetRotation.y);
            move.y = 0;
            move.multiplyScalar(this.speed);
            const newPos = this.positionCmpt.getThreePosition().clone().add(move);

            if (this.canMoveTo(newPos.x, this.positionCmpt.getThreePosition().y, newPos.z, map)) {
                this.positionCmpt.getThreePosition().x = newPos.x;
                this.positionCmpt.getThreePosition().z = newPos.z;
                debugCallbackFunc(`Move allowed to: x=${newPos.x.toFixed(2)}, y=${newPos.y.toFixed(2)}, z=${newPos.z.toFixed(2)}`);
            } else {
                debugCallbackFunc(`Collision at: x=${Math.floor(newPos.x)}, y=${Math.floor(newPos.y - this.height)}, z=${Math.floor(newPos.z)}`);
            }
        }

        // 提高平滑因子，减少旋转延迟
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * this.rotationSmoothing;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * this.rotationSmoothing;

        // 更新相机旋转
        this.cameraCmpt.getCamera().rotation.set(this.currentRotation.x, this.currentRotation.y, 0);
        this.cameraCmpt.getCamera().position.copy(this.positionCmpt.getThreePosition());
    }
};

module.exports = Player;
