import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";

import { Utils, AssortUtils } from "./Refs/Utils";
import {
  HandbookIDs,
  SecureContainers,
  Currency,
  Traders
} from "./Refs/Enums";

class OnyxContainer implements IPostDBLoadMod {
  modName: string

  // Removed dependency check because we don't use Saria trader  

  constructor() {
    this.modName = "Onyx Container";
  }

  public postDBLoad(container: DependencyContainer): void {
    const modLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
    const logger = container.resolve<ILogger>("WinstonLogger");
    const hashUtil = container.resolve<HashUtil>("HashUtil");
    const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
    const tables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
    const assortUtils = new AssortUtils(hashUtil, logger);
    const utils = new Utils;

    // removed the dependency check because we don't use Saria trader

    this.createOnyxContainer(hashUtil, tables, logger, this.modName, jsonUtil, utils, assortUtils);
    logger.log("Saria has crafted a new secured container...use it well.", LogTextColor.CYAN);
  }

  public createOnyxContainer(hashUtil, tables, logger, modName, jsonUtil, utils, assortUtils) {
    const heightWidth = {
      InternalSize: {
        "CellsH": [4],
        "CellsV": [4]
      }
    }
    const newGrids = utils.createGrid(hashUtil, "Onyx", heightWidth, modName, logger);
    utils.createCase(SecureContainers.KappaSC, "Onyx", tables, jsonUtil, newGrids, HandbookIDs.SecureContainers, 12999999, "Secure Container Onyx", "OnyxSC", "The best of the best. The rarest case found in the land of Tarkov, used by only the most skilled and seasoned PMC's.", "assets/content/items/containers/RopesContainer.bundle")

    // Removed exporting to the Saria trader because we don't use Saria trader
  }
}
module.exports = { mod: new OnyxContainer() }