const Actor = require('./Actor.js');
const THREE = require('three');

// 玩家
class Player extends Actor {
    constructor(x, y, z, camera) {
        super(x, y, z);
        this.camera = camera;
        this.height = 1.8;
        this.width = 0.4;
        this.speed = 0.0717;
        this.jumpStrength = 0.2;
        this.gravity = -0.01;
        this.targetRotation = { x: 0, y: 0 };
        this.currentRotation = { x: 0, y: 0 };
        this.rotationSmoothing = 0.3; // 提高平滑因子，加快旋转响应
        this.mouseSensitivity = 0.002; // 新增：鼠标灵敏度参数
        this.camera.position.copy(this.position);
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
        this.velocity.y += this.gravity;
        this.position.add(this.velocity);

        // 地面碰撞检测
        if (this.position.y < this.height) {
            this.position.y = this.height;
            this.velocity.y = 0;
        }

        // 跳跃逻辑：仅当玩家在地面上时允许跳跃
        // if (keys['Space'] && this.position.y <= this.height) {
        //     this.velocity.y = this.jumpStrength;
        //     debugCallbackFunc('Player jumped');
        // }
        if (keys['Space']) {
            this.velocity.y = this.jumpStrength;
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
            const newPos = this.position.clone().add(move);

            if (this.canMoveTo(newPos.x, this.position.y, newPos.z, map)) {
                this.position.x = newPos.x;
                this.position.z = newPos.z;
                debugCallbackFunc(`Move allowed to: x=${newPos.x.toFixed(2)}, y=${newPos.y.toFixed(2)}, z=${newPos.z.toFixed(2)}`);
            } else {
                debugCallbackFunc(`Collision at: x=${Math.floor(newPos.x)}, y=${Math.floor(newPos.y - this.height)}, z=${Math.floor(newPos.z)}`);
            }
        }

        // 提高平滑因子，减少旋转延迟
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * this.rotationSmoothing;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * this.rotationSmoothing;

        // 更新相机旋转
        this.camera.rotation.set(this.currentRotation.x, this.currentRotation.y, 0);
        this.camera.position.copy(this.position);
    }
}

module.exports = Player;