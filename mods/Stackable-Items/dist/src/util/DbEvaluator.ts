import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import ItemId from "./constants/ItemId";


export class DbEvaluator {
  server: DatabaseServer;
  constructor(server: DatabaseServer) {
    this.server = server;
  }
  getTables() {
    return this.server.getTables();
  }
  getItems() {
    return this.getTables().templates.items;
  }
  getItem(item_id: string) {
    return this.getItems()[item_id];
  }
  isBarterItem(item_id: string) {
    return this.hasParentRecursive(item_id, ItemId.BARTER_ITEM);
  }
  hasParentRecursive(item_id: string, parent: string) {
    if (item_id === "" || parent === "") return false;
    const itemsParent = this.getItem(item_id)._parent;
    if (parent === itemsParent) return true;
    return this.hasParentRecursive(itemsParent, parent);
  }
  isDogtag(item_id: string) {
    return item_id === ItemId.BARTER_BEAR || item_id === ItemId.BARTER_USEC;
  }
  hasResource(item_id: string) {
    return this.getItem(item_id)._props.Resource > 0;
  }
  hasDurability(item_id: string) {
    return this.getItem(item_id)._props.Durability > 0;
  }
}
