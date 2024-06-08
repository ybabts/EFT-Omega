import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DbEvaluator } from "./util/DbEvaluator";
import * as config from "../config/config.json";
import ItemId from "./util/constants/ItemId";

class Mod implements IPostDBLoadMod {
    public postDBLoad(container: DependencyContainer): void {
        if (config.enable_mod === false) return;
        const logger = container.resolve<ILogger>("WinstonLogger");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const items = tables.templates.items;
        const dbe = new DbEvaluator(databaseServer);

        logger.log("Welcome to EFT Omega!", "yellow")

        let stackSizesChanged = 0;

        for (const item of Object.values(items)) {
            if (config.enable_durability_items_stacking === false && item._props.Durability > 0) continue;
            if (config.enable_resource_items_stacking === false && item._props.Resource > 0) continue;
            if (config.enable_resource_items_stacking === false && item._props.MaxHpResource > 0) continue;
            for (const category of Object.keys(config.stack_sizes.by_category)) {
                if (dbe.hasParentRecursive(item._id, ItemId[category.toUpperCase()])) {
                    tables.templates.items[item._id]._props.StackMaxSize = config.stack_sizes.by_category[category.toUpperCase()];
                    stackSizesChanged++;
                    continue;
                }
            }
        }
        for (const item_name of Object.keys(config.stack_sizes.by_name)) {
            tables.templates.items[ItemId[item_name.toUpperCase()]]._props.StackMaxSize = config.stack_sizes.by_name[item_name.toUpperCase()];
            stackSizesChanged++;
        }

        console.log("Stack sizes changed:", stackSizesChanged)
    }
}

module.exports = { mod: new Mod() }
