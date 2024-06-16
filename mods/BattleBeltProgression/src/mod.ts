import { DependencyContainer } from "npm:tsyringe@4.8.0";
import { ConfigServer, ConfigTypes, DatabaseServer, IPostDBLoadMod, ITEM_ID, ITraderConfig, QUEST_ID, QuestRewardType, TRADER_ID, common } from "jsr:@ybabts/spt-aki@^1.0.3";
import { addOfferToTrader, addRewardToQuest } from "./util.ts";
import config from "../config/config.json" with { type: "json" };

class Mod implements IPostDBLoadMod {
  public postDBLoad(container: DependencyContainer): void {
    if (config.enable === false) return void 0;
    const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
    const configServer = container.resolve<ConfigServer>("ConfigServer");
    const traderConfig = configServer.getConfig<ITraderConfig.ITraderConfig>("aki-trader" as ConfigTypes.TRADER);

    const tables = databaseServer.getTables();

    // blacklists belts from fence
    console.log("blacklisting belts from fence:", Object.keys(config.beltIds).length);
    for (const belt in config.beltIds) {
      traderConfig.fence.blacklist.push(config.beltIds[belt as keyof typeof config.beltIds]);
    }

    // adds belts to quest rewards
    console.log("adding belts to quest rewards:", config.addBeltToQuestRewards.filter(v => v.quest !== "").length);
    for (const entry of config.addBeltToQuestRewards) {
      if (entry.quest === "") continue;
      addRewardToQuest({
        id: entry.id,
        reward_id: entry.reward_id,
        quest_id: QUEST_ID[entry.quest as keyof typeof QUEST_ID]!,
        item_id: config.beltIds[entry.belt as keyof typeof config.beltIds],
        count: 1,
        quests: tables.templates?.quests!,
      });
    }
  }
}

const mod = new Mod();

export { mod }