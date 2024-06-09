"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbEvaluator_1 = require("./util/DbEvaluator");
var ItemId_1 = require("./util/constants/ItemId");
var Mod = /** @class */ (function () {
    function Mod() {
    }
    Mod.prototype.postDBLoad = function (container) {
        var logger = container.resolve("WinstonLogger");
        var databaseServer = container.resolve("DatabaseServer");
        var tables = databaseServer.getTables();
        var dbe = new DbEvaluator_1.DbEvaluator(databaseServer);
        // Adds secure alpha to Debut
        dbe.getQuest("5936d90786f7742b1420ba5b").rewards.Success.push({
            "findInRaid": true,
            "id": "5c51c28a86f77478be4009fa",
            "index": 0,
            "items": [
                {
                    "_id": "6492e44af4287b13040fc722",
                    "_tpl": ItemId_1.default.SECURE_ALPHA,
                    "upd": {
                        "StackObjectsCount": 1
                    }
                }
            ],
            "target": "6492e44af4287b13040fc722",
            "type": "Item",
            "unknown": false,
            "value": "1"
        });
        // adds secure waist pouch to Shortage
        dbe.getQuest("5967733e86f774602332fc84").rewards.Success.push({
            "findInRaid": true,
            "id": "5c51c28a86f77478be4009fa",
            "index": 0,
            "items": [
                {
                    "_id": "6492e44af4287b13040fc722",
                    "_tpl": ItemId_1.default.SECURE_WAIST_POUCH,
                    "upd": {
                        "StackObjectsCount": 1
                    }
                }
            ],
            "target": "6492e44af4287b13040fc722",
            "type": "Item",
            "unknown": false,
            "value": "1"
        });
        // adds secure beta to Farming Part 3
        dbe.getQuest("5ac3462b86f7741d6118b983").rewards.Success.push({
            "findInRaid": true,
            "id": "5c51c28a86f77478be4009fa",
            "index": 0,
            "items": [
                {
                    "_id": "6492e44af4287b13040fc722",
                    "_tpl": ItemId_1.default.SECURE_BETA,
                    "upd": {
                        "StackObjectsCount": 1
                    }
                }
            ],
            "target": "6492e44af4287b13040fc722",
            "type": "Item",
            "unknown": false,
            "value": "1"
        });
        // adds secure gamma to Dandies
        dbe.getQuest("65734c186dc1e402c80dc19e").rewards.Success.push({
            "findInRaid": true,
            "id": "5c51c28a86f77478be4009fa",
            "index": 0,
            "items": [
                {
                    "_id": "6492e44af4287b13040fc722",
                    "_tpl": ItemId_1.default.SECURE_GAMMA,
                    "upd": {
                        "StackObjectsCount": 1
                    }
                }
            ],
            "target": "6492e44af4287b13040fc722",
            "type": "Item",
            "unknown": false,
            "value": "1"
        });
        // adds secure kappa to the guide
        dbe.getQuest("5c0d4e61d09282029f53920e").rewards.Success.push({
            "findInRaid": true,
            "id": "5c51c28a86f77478be4009fa",
            "index": 0,
            "items": [
                {
                    "_id": "6492e44af4287b13040fc722",
                    "_tpl": ItemId_1.default.SECURE_KAPPA,
                    "upd": {
                        "StackObjectsCount": 1
                    }
                }
            ],
            "target": "6492e44af4287b13040fc722",
            "type": "Item",
            "unknown": false,
            "value": "1"
        });
        // Adds secure onyx to Collector
        dbe.getQuest("5c51aac186f77432ea65c552").rewards.Success[0].items[0]._tpl = "Onyx";
        dbe.getQuest("5c51aac186f77432ea65c552").rewards.Success[0].unknown = false;
    };
    return Mod;
}());
module.exports = { mod: new Mod() };
