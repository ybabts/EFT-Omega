"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbEvaluator = void 0;
const ItemId_1 = __importDefault(require("./constants/ItemId"));
class DbEvaluator {
    server;
    constructor(server) {
        this.server = server;
    }
    getTables() {
        return this.server.getTables();
    }
    getItems() {
        return this.getTables().templates.items;
    }
    getItem(item_id) {
        return this.getItems()[item_id];
    }
    isBarterItem(item_id) {
        return this.hasParentRecursive(item_id, ItemId_1.default.BARTER_ITEM);
    }
    hasParentRecursive(item_id, parent) {
        if (item_id === "" || parent === "")
            return false;
        const itemsParent = this.getItem(item_id)._parent;
        if (parent === itemsParent)
            return true;
        return this.hasParentRecursive(itemsParent, parent);
    }
    isDogtag(item_id) {
        return item_id === ItemId_1.default.BARTER_BEAR || item_id === ItemId_1.default.BARTER_USEC;
    }
    hasResource(item_id) {
        return this.getItem(item_id)._props.Resource > 0;
    }
    hasDurability(item_id) {
        return this.getItem(item_id)._props.Durability > 0;
    }
    getQuest(quest_id) {
        return this.getTables().templates.quests[quest_id];
    }
}
exports.DbEvaluator = DbEvaluator;
