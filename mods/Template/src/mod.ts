import { DependencyContainer } from "npm:tsyringe";
import { DatabaseServer, IPostDBLoadMod } from "https://deno.land/x/sptaki@1.1.0/mod.ts";

class Mod implements IPostDBLoadMod {
    public postDBLoad(container: DependencyContainer): void {
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        console.log("HELLO WORLD WE LOADED THE TEMPLATE MOD");
        const items = databaseServer.getTables().templates?.items;
        console.log(Object.keys(items ?? {}).length, "ITEMS ARE IN THE GAME");
    }
}

const mod = new Mod();

export { mod }