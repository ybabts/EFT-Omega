"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DbEvaluator_1 = require("./util/DbEvaluator");
const config = __importStar(require("../config/config.json"));
const ItemId_1 = __importDefault(require("./util/constants/ItemId"));
class Mod {
    postDBLoad(container) {
        if (config.enable_mod === false)
            return;
        const logger = container.resolve("WinstonLogger");
        const databaseServer = container.resolve("DatabaseServer");
        const tables = databaseServer.getTables();
        const items = tables.templates.items;
        const dbe = new DbEvaluator_1.DbEvaluator(databaseServer);
        logger.log("Welcome to EFT Omega!", "yellow");
        let stackSizesChanged = 0;
        for (const item of Object.values(items)) {
            if (config.enable_durability_items_stacking === false && item._props.Durability > 0)
                continue;
            if (config.enable_resource_items_stacking === false && item._props.Resource > 0)
                continue;
            if (config.enable_resource_items_stacking === false && item._props.MaxHpResource > 0)
                continue;
            for (const category of Object.keys(config.stack_sizes.by_category)) {
                if (dbe.hasParentRecursive(item._id, ItemId_1.default[category.toUpperCase()])) {
                    tables.templates.items[item._id]._props.StackMaxSize = config.stack_sizes.by_category[category.toUpperCase()];
                    stackSizesChanged++;
                    continue;
                }
            }
        }
        for (const item_name of Object.keys(config.stack_sizes.by_name)) {
            tables.templates.items[ItemId_1.default[item_name.toUpperCase()]]._props.StackMaxSize = config.stack_sizes.by_name[item_name.toUpperCase()];
            stackSizesChanged++;
        }
        console.log("Stack sizes changed:", stackSizesChanged);
    }
}
module.exports = { mod: new Mod() };
//# sourceMappingURL=mod.js.map