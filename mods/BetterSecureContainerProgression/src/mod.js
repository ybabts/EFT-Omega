"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbEvaluator_1 = require("./util/DbEvaluator");
var ItemId_1 = require("./util/constants/ItemId");
var configConstants_1 = require("./util/constants/configConstants");
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
        function addContainerUnlockQuestReward(quest_id, container_id, trader_id, assort_name, index) {
            tables.traders[trader_id].assort.items.push({
                "_id": assort_name,
                "_tpl": container_id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "StackObjectsCount": 200,
                    "BuyRestrictionMax": 1,
                    "BuyRestrictionCurrent": 0
                }
            });
            tables.traders[trader_id].assort.barter_scheme[assort_name] = [
                [
                    {
                        "count": 50000,
                        "_tpl": ItemId_1.default.MONEY_RUB
                    }
                ]
            ];
            tables.traders[trader_id].assort.loyal_level_items[assort_name] = 1;
            // Adds quest reward
            dbe.getQuest(quest_id).rewards.Success.push({
                "findInRaid": true,
                "id": "60cb46de6a2a1958fc522cb5",
                "index": index,
                "items": [
                    {
                        "_id": "65ba7538bf3fc35a9a0a023d",
                        "_tpl": container_id,
                        "upd": {
                            "StackObjectsCount": 1
                        }
                    }
                ],
                "target": "65ba7538bf3fc35a9a0a023d",
                "type": "Item",
                "value": "1"
            });
            // adds trader unlock
            dbe.getQuest(quest_id).rewards.Success.push({
                "id": "5ac6502386f77405cd54625d",
                "index": index + 1,
                "items": [
                    {
                        "_id": "65ba7538bf3fc35a9a0a02d8",
                        "_tpl": assort_name
                    }
                ],
                "loyaltyLevel": 1,
                "target": "65ba7538bf3fc35a9a0a02d8",
                "traderId": trader_id,
                "type": "AssortmentUnlock"
            });
        }
        // Adds unlock for small ammo pouch for Prapor Shootout Picnic
        addContainerUnlockQuestReward("59674cd986f7744ab26e32f2", "ae9e418fd5d4c4eec4a0e6ea", configConstants_1.traderIDs.PRAPOR, "6665eca3cd2e59d6bfe5847f", 9);
        // Adds unlock for small keyring for Therapist Pharmacist
        addContainerUnlockQuestReward("5969f9e986f7741dde183a50", "2eabd4da4ab194eb168e72d3", configConstants_1.traderIDs.THERAPIST, "6665ecac391ce31ad5b99c26", 6);
    };
    return Mod;
}());
module.exports = { mod: new Mod() };
