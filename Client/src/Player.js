const Actor = require('./Actor.js');
const THREE = require('three');

// 玩家
class Player extends Actor {
    constructor(x, y, z, camera) {
        super(x, y, z);
        // Three.js相机
        this.camera = camera;
        // 定义玩家碰撞体高度，模拟人类身高
        this.height = 1.8;
        // 定义玩家碰撞体宽度，模拟人类宽度
        this.width = 0.4;
        // 移动速度
        this.speed = 0.0717;
        // 跳跃力度
        this.jumpStrength = 0.2;
        // 重力
        this.gravity = -0.01;
        // 目标旋转
        this.targetRotation = { x: 0, y: 0 };
        // 当前旋转
        this.currentRotation = { x: 0, y: 0 };
        // 旋转平滑因子
        this.rotationSmoothing = 0.1;
        // 相机位置
        this.camera.position.copy(this.position);
    }

    // true: 目标位置没有障碍物，玩家头可以移动到该位置
    // false: 目标位置有方块(脚部或头部位置被占用)，玩家头无法移动
    canMoveTo(x, y, z, map) {
        // 如果玩家到了指定位置 身体部分有方块
        // 则玩家根本不能放在目标位置
        // 脚
        const feet = Math.floor(y - this.height);
        // 头
        const head = Math.floor(y);
        const checkX = Math.floor(x);
        const checkZ = Math.floor(z);

        // 检测脚部位方块
        // y-this.height+0.1 能保证 feet时正的
        const feetBlock = y > this.height + 0.1 ? map.getBlock(checkX, feet, checkZ) : null;
        // 检测头部位置方块
        const headBlock = map.getBlock(checkX, head, checkZ);
        if (feetBlock || headBlock) {
            return false;
        }
        return true;
    }

    updateRotation(event, debugCallbackFunc) {
        // 根据鼠标水平移动更新玩家的偏航角yaw 绕Y轴的旋转
        // 灵敏度因子0.001，将像素移动转换为角度（弧度）。例如，移动1000像素对应1弧度（约57.3°）
        this.targetRotation.y -= event.movementX * 0.001;
        // 根据鼠标垂直移动更新玩家的俯仰角（pitch，绕X轴的旋转）。
        this.targetRotation.x -= event.movementY * 0.001;
        // 限制俯仰角（targetRotation.x）在 ±90°（±π/2 弧度）范围内。
        this.targetRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.targetRotation.x));
        // 将俯仰角从弧度转换为度，并保留1位小数。
        const pitchDeg = (this.targetRotation.x * 180 / Math.PI).toFixed(1);
        // 将偏航角从弧度转换为度，并保留1位小数。
        const yawDeg = (this.targetRotation.y * 180 / Math.PI).toFixed(1);
        if (debugCallbackFunc) {
            debugCallbackFunc(`Camera rotation: pitch=${pitchDeg}°, yaw=${yawDeg}°`);
        }
    }

    // 定义 Player 类的 update 方法，负责每帧更新玩家的状态
    // 参数：map（游戏世界地图，用于碰撞检测），keys（键盘输入状态），debugCallbackFunc（调试回调函数）
    update(map, keys, debugCallbackFunc) {
        // 应用重力：将重力加速度（this.gravity，通常为负值）累加到玩家的垂直速度（velocity.y）
        this.velocity.y += this.gravity;

        // 更新位置：将玩家的速度向量（this.velocity）应用到当前位置（this.position）
        // Three.js 的 Vector3.add 方法会将速度分量加到位置分量上，实现移动
        this.position.add(this.velocity);

        // 检测地面碰撞：检查玩家是否低于最低高度（this.height，通常为玩家身高）
        if (this.position.y < this.height) {
            // 如果玩家低于地面（y < this.height），将玩家位置固定到地面（y = this.height）
            this.position.y = this.height;
            // 重置垂直速度为 0，模拟落地效果，防止继续下落
            this.velocity.y = 0;
        }

        // 定义移动方向向量：创建一个 Three.js 的 Vector3 对象，用于存储玩家的水平移动方向
        const direction = new THREE.Vector3();

        // 检测 W 键（前移）：如果按下 W 键，方向向量 z 分量减 1（向前移动）
        if (keys['KeyW']) direction.z -= 1;

        // 检测 S 键（后移）：如果按下 S 键，方向向量 z 分量加 1（向后移动）
        if (keys['KeyS']) direction.z += 1;

        // 检测 A 键（左移）：如果按下 A 键，方向向量 x 分量减 1（向左移动）
        if (keys['KeyA']) direction.x -= 1;

        // 检测 D 键（右移）：如果按下 D 键，方向向量 x 分量加 1（向右移动）
        if (keys['KeyD']) direction.x += 1;

        // 检测跳跃（空格键）：仅当玩家在地面上（y <= this.height）时允许跳跃
        if (keys['Space'] && this.position.y <= this.height) this.velocity.y = this.jumpStrength;

        // 检查是否需要移动：如果方向向量长度大于 0（即有键盘输入）
        if (direction.length() > 0) {
            // 归一化方向向量：将方向向量长度设为 1，保持移动速度一致（无论按单键还是组合键）
            direction.normalize(); // 归一化后就是方向了

            // 应用玩家朝向：将方向向量绕 Y 轴旋转，基于当前视角的偏航角（currentRotation.y）
            // 确保移动方向与玩家视角一致（例如按 W 键时向前方移动）
            const move = direction.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), this.currentRotation.y);

            // 限制移动到水平面：将移动向量的 y 分量设为 0，仅允许水平移动
            move.y = 0;

            // 应用移动速度：将移动向量乘以玩家速度（this.speed），得到每帧的位移
            move.multiplyScalar(this.speed); // 方向乘速度得出位移

            // 计算新位置：将移动向量加到当前位置，得到目标位置
            const newPos = this.position.clone().add(move);

            // 碰撞检测：调用 canMoveTo 方法检查目标位置是否可达（无障碍物）
            if (this.canMoveTo(newPos.x, this.position.y, newPos.z, map)) {
                // 如果可移动：更新玩家的 x 和 z 坐标到新位置
                this.position.x = newPos.x;
                this.position.z = newPos.z;
                // 输出调试信息：记录允许移动到的位置，保留两位小数
                debugCallbackFunc(`Move allowed to: x=${newPos.x.toFixed(2)}, y=${newPos.y.toFixed(2)}, z=${newPos.z.toFixed(2)}`);
            } else {
                // 如果有碰撞：输出碰撞位置的格子坐标（脚部格子），用于调试
                debugCallbackFunc(`Collision at: x=${Math.floor(newPos.x)}, y=${Math.floor(newPos.y - this.height)}, z=${Math.floor(newPos.z)}`);
            }
        }

        // 平滑更新俯仰角：通过插值使当前俯仰角（currentRotation.x）逐渐接近目标俯仰角（targetRotation.x）
        // 使用 rotationSmoothing（例如 0.1）控制平滑速度
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * this.rotationSmoothing;

        // 平滑更新偏航角：通过插值使当前偏航角（currentRotation.y）逐渐接近目标偏航角（targetRotation.y）
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * this.rotationSmoothing;

        // 更新相机旋转：将当前旋转角度应用到相机（俯仰角 x，偏航角 y，滚转角 z 设为 0）
        this.camera.rotation.set(this.currentRotation.x, this.currentRotation.y, 0);

        // 更新相机位置：将玩家位置复制到相机，确保相机与玩家同步（通常表示第一人称视角）
        this.camera.position.copy(this.position);
    }
};

module.exports = Player;