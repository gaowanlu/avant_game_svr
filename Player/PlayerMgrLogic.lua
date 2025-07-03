local PlayerMgr = require("PlayerMgrData");
local Player = require("PlayerLogic")
local Log = require("Log")

PlayerMgr["players"] = PlayerMgr["players"] or {}

function PlayerMgr.CreatePlayer(playerId)
    if PlayerMgr.players[playerId] then
        Log:Error("已经存在Player %d", playerId)
        return PlayerMgr.players[playerId]
    end

    Log:Error("未存在Player %d", playerId)
    local player = Player.new(playerId)
    PlayerMgr.players[playerId] = player
    return player
end

function PlayerMgr.GetPlayer(playerId)
    return PlayerMgr.players[playerId]
end

function PlayerMgr.RemovePlayer(playerId)
    PlayerMgr.players[playerId] = nil
end

function PlayerMgr.OnTick()
    -- Log:Error("OnTickAll Player")
    for _, player in pairs(PlayerMgr.players) do
        player:OnTick()
    end
end

function PlayerMgr.OnStop()
    Log:Error("PlayerMgr OnStop")
end

return PlayerMgr
