const GameSystemInstance = require("./system/GameSystem");

const Freeland = {
    version: 'v0.0.1'
};

Freeland.ConsoleVersion = function () {
    console.log(`Freeland Version: ${this.version}`);
}

Freeland.OnDOMContentLoaded = function () {
    // console.log("DOMContentLoaded");
    this.ConsoleVersion();

    // 游戏系统实例初始化
    GameSystemInstance.Init();
}

window.addEventListener('DOMContentLoaded', () => {
    Freeland.OnDOMContentLoaded()
}, false);

module.exports = Freeland;
