"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
var Mod = /** @class */ (function () {
    function Mod() {
    }
    Mod.prototype.postDBLoad = function (container) {
        var _a;
        var databaseServer = container.resolve("DatabaseServer");
        console.log("HELLO WORLD WE LOADED THE TEMPLATE MOD");
        var items = (_a = databaseServer.getTables().templates) === null || _a === void 0 ? void 0 : _a.items;
        console.log(Object.keys(items !== null && items !== void 0 ? items : {}).length, "ITEMS ARE IN THE GAME");
    };
    return Mod;
}());
var mod = new Mod();
exports.mod = mod;
