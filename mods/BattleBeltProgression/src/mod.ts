import { DependencyContainer } from "npm:tsyringe@4.8.0";
import { DatabaseServer, IPostDBLoadMod, ITEM_ID, TRADER_ID, common } from "jsr:@ybabts/spt-aki@^1.0.3";

class Mod implements IPostDBLoadMod {
  public postDBLoad(container: DependencyContainer): void {
    const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
    const traders = databaseServer.getTables().traders!;
    const kappa_barter_id = "6667a5f8d9e6623ce671ce8f";
    console.log(TRADER_ID.PRAPOR, TRADER_ID.SKIER)
    console.log("Welcome to Tarkov!")
    addOfferToTrader({
      id: kappa_barter_id,
      trader: traders[TRADER_ID.SKIER],
      loyalty: 1
    }, {
      name: "ITEM_CONTAINER_SECURED_KAPPA",
      stock: 100,
      restrict_max: 2
    }, [{
      name: "DOLLARS",
      count: 25565,
    }, {
      name: "EUROS",
      count: 6969
    }, {
      name: "ROUBLES",
      count: 42069
    }])
  }
}

function addOfferToTrader(options: {
  id: string,
  trader: common.tables.ITrader.ITrader,
  loyalty: number
}, item: {
  name: keyof typeof ITEM_ID,
  stock: number,
  restrict_max: number,
}, barter: {
  name: keyof typeof ITEM_ID,
  count: number
}[]) {
  options.trader.assort?.items.push({
    _id: options.id,
    _tpl: ITEM_ID[item.name],
    parentId: "hideout",
    slotId: "hideout",
    upd: {
      StackObjectsCount: item.stock,
      BuyRestrictionMax: item.restrict_max,
      BuyRestrictionCurrent: 0
    }
  });
  options.trader.assort!.loyal_level_items[options.id] = 1;
  options.trader.assort!.barter_scheme[options.id] = [barter.map((item) => {
    return {
      _tpl: ITEM_ID[item.name],
      count: item.count
    }

  })]
}

const mod = new Mod();

export { mod }