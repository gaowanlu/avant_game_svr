const Freeland = {};
const THREE = require('three');
const Game = require("./Game.js");

Freeland.OnDOMContentLoaded = function () {
    console.log("DOMContentLoaded");

    // 显示调试面板
    this.GetDebugPanelElement().show();

    // 检查Three.js是否就绪
    if (!this.CheckExistsTHREE()) {
        // 直接结束
        return;
    }

    Game.init();
}

Freeland.CheckExistsTHREE = function () {
    // Three.js可能加载失败了
    if (typeof THREE === "undefined") {
        console.error("THREE not exists");
        this.GetDebugPanelElement().update("Error: Three.js failed to load.");
        return false;
    } else {
        console.log("THREE exists");
        return true;
    }
}

Freeland.GetDebugPanelElement = function () {
    const debugPanel = document.getElementById('freeland-debug-panel');
    return {
        el: debugPanel,
        show: function () {
            this.el.style.display = "block";
        },
        hide: function () {
            this.el.style.display = "none";
        },
        update: function (text) {
            this.el.innerHTML = text;
        }
    };
}

window.addEventListener('DOMContentLoaded', () => Freeland.OnDOMContentLoaded(), false);

module.exports = Freeland;