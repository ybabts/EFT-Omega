var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// src/mod.ts
var mod_exports = {};
__export(mod_exports, {
  mod: () => mod
});
module.exports = __toCommonJS(mod_exports);
var Mod = class {
  postDBLoad(container) {
    var _a;
    const databaseServer = container.resolve("DatabaseServer");
    console.log("HELLO WORLD WE LOADED THE MOD");
    const items = (_a = databaseServer.getTables().templates) == null ? void 0 : _a.items;
    console.log(Object.keys(items != null ? items : {}).length, "ITEMS ARE IN THE GAME");
  }
};
var mod = new Mod();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mod
});
