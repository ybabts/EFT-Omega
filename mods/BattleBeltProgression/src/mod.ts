import { DependencyContainer } from "npm:tsyringe";
import { DatabaseServer, IPostDBLoadMod } from "../deps.ts";

class Mod implements IPostDBLoadMod {
  public postDBLoad(container: DependencyContainer): void {
    const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
    const traders = databaseServer.getTables().traders!;
  }
}

const mod = new Mod();

export { mod }