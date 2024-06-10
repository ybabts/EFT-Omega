import { DependencyContainer } from "npm:tsyringe";
import { DatabaseServer, IPostDBLoadMod } from "../deps.ts";
import { TRADER_ID } from "https://deno.land/x/sptaki@1.2.0/mod.ts";

class Mod implements IPostDBLoadMod {
  public postDBLoad(container: DependencyContainer): void {
    const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
    const traders = databaseServer.getTables().traders!;
    traders[TRADER_ID]
  }
}

const mod = new Mod();

export { mod }