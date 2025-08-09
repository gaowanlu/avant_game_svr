class UISystem {
    constructor() {
        this.startScreen = document.getElementById('freeland-start-screen');
        this.inGameUI = document.getElementById('freeland-in-game-ui');
        this.debugText = document.getElementById('freeland-debug-text');
        this.debugPanel = document.getElementById('freeland-debug-panel');
        this.crosshair = document.getElementById('freeland-crosshair');
        this.startButton = document.getElementById('freeland-start-button');
        this.exitButton = document.getElementById('freeland-exit-button');
        this.playBlockTypeSelect = document.getElementById('freeland-block-type-select');
        this.debugMessages = [];
    }

    init() {
        // 派发事件
        // this.startButton.addEventListener('click', startGameCallbackFunc);
        // this.exitButton.addEventListener('click', exitGameCallbackFunc);
    }

    bindPlayBlockTypeSelectChange(playBlockTypeCallbackFunc) {
        this.playBlockTypeSelect.addEventListener('change', (e) => playBlockTypeCallbackFunc(e.target.value));
    }

    showStartScreen() {
        this.startScreen.style.display = 'flex';
        this.Game.renderer.domElement.style.display = 'none';
        this.crosshair.style.display = 'none';
        this.debugText.style.display = 'none';
        this.debugPanel.style.display = 'none';
        this.inGameUI.style.display = 'none';
    }

    OnGameStart() {
        this.showInGameUI();
    }

    OnGameExit() {
        this.showStartScreen();
    }

    showInGameUI() {
        this.startScreen.style.display = 'none';
        this.Game.renderer.domElement.style.display = 'block';
        this.crosshair.style.display = 'block';
        this.debugText.style.display = 'block';
        this.debugPanel.style.display = 'block';
        this.inGameUI.style.display = 'block';
    }

    setDebugText(text) {
        this.debugText.textContent = text;
    }

    updateDebugPanel(message) {
        // this.debugMessages.push(message);
        // if (this.debugMessages.length > 5) this.debugMessages.shift();
        // let debugText = '';
        // if (this.Game.player) {
        //     const pitchDeg = (this.Game.player.currentRotation.x * 180 / Math.PI).toFixed(1);
        //     const yawDeg = (this.Game.player.currentRotation.y * 180 / Math.PI).toFixed(1);
        //     debugText += `Player: x=${this.Game.player.position.x.toFixed(2)}, y=${this.Game.player.position.y.toFixed(2)}, z=${this.Game.player.position.z.toFixed(2)}\n`;
        //     debugText += `Camera: pitch=${pitchDeg}°, yaw=${yawDeg}°\n`;
        // } else {
        //     debugText += `Player: Not initialized\nCamera: Not initialized\n`;
        // }
        // if (this.Game.npcs && this.Game.npcs.length > 0) {
        //     this.Game.npcs.forEach((npc, index) => {
        //         debugText += `NPC ${index}: x=${npc.position.x.toFixed(2)}, z=${npc.position.z.toFixed(2)}\n`;
        //     });
        // } else {
        //     debugText += `NPCs: None\n`;
        // }
        // debugText += '\nLogs:\n' + this.debugMessages.join('\n');
        // this.debugPanel.innerHTML = debugText;
    }

};

const UISystemInstance = new UISystem();

module.exports = UISystemInstance;
