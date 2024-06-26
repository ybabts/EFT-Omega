"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbEvaluator = void 0;
var ItemId_1 = require("./constants/ItemId");
var DbEvaluator = /** @class */ (function () {
    function DbEvaluator(server) {
        this.server = server;
    }
    DbEvaluator.prototype.getTables = function () {
        return this.server.getTables();
    };
    DbEvaluator.prototype.getItems = function () {
        return this.getTables().templates.items;
    };
    DbEvaluator.prototype.getItem = function (item_id) {
        return this.getItems()[item_id];
    };
    DbEvaluator.prototype.isBarterItem = function (item_id) {
        return this.hasParentRecursive(item_id, ItemId_1.default.BARTER_ITEM);
    };
    DbEvaluator.prototype.hasParentRecursive = function (item_id, parent) {
        if (item_id === "" || parent === "")
            return false;
        var itemsParent = this.getItem(item_id)._parent;
        if (parent === itemsParent)
            return true;
        return this.hasParentRecursive(itemsParent, parent);
    };
    DbEvaluator.prototype.isDogtag = function (item_id) {
        return item_id === ItemId_1.default.BARTER_BEAR || item_id === ItemId_1.default.BARTER_USEC;
    };
    DbEvaluator.prototype.hasResource = function (item_id) {
        return this.getItem(item_id)._props.Resource > 0;
    };
    DbEvaluator.prototype.hasDurability = function (item_id) {
        return this.getItem(item_id)._props.Durability > 0;
    };
    DbEvaluator.prototype.getQuest = function (quest_id) {
        return this.getTables().templates.quests[quest_id];
    };
    return DbEvaluator;
}());
exports.DbEvaluator = DbEvaluator;
