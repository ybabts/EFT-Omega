import { ITEM_ID, QuestRewardType, common } from "jsr:@ybabts/spt-aki@^1.0.3";

export function addOfferToTrader(options: {
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

export function addRewardToQuest(options: {
  id: string,
  reward_id: string,
  quest_id: string,
  item_id: string,
  count: number,
  quests: Record<string, common.tables.IQuest.IQuest>
}) {
  const quest = options.quests[options.quest_id];
  quest.rewards.Success?.push({
    "findInRaid": true,
    "id": options.id,
    "index": quest.rewards.Success[quest.rewards.Success.length - 1].index + 1,
    "items": [
      {
        "_id": options.reward_id,
        "_tpl": options.item_id,
        "upd": {
          "StackObjectsCount": options.count
        }
      }
    ],
    "target": options.reward_id,
    "type": "Item" as QuestRewardType.ITEM,
    "value": options.count.toString()
  })
}