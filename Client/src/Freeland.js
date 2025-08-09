const GameSystemInstance = require("./system/GameSystem");

const Freeland = {};

Freeland.OnDOMContentLoaded = function () {
    console.log("DOMContentLoaded");

    GameSystemInstance.init();
}

window.addEventListener('DOMContentLoaded', () => Freeland.OnDOMContentLoaded(), false);

module.exports = Freeland;
