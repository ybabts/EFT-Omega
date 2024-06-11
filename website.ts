import { existsSync } from "https://deno.land/std@0.224.0/fs/exists.ts";

import { default as omega } from "./omega.json" with { type: "json" }

// get a list of directories in /mods
const folders = Array.from(Deno.readDirSync("./mods"));
// for each folder, look in /dist for a .zip file
const mods = folders.map((folder) => {
  if (existsSync(`./mods/${folder.name}/dist`) === false) return null;
  const files = Array.from(Deno.readDirSync(`./mods/${folder.name}/dist`));
  const mod = files.find((file) => file.name.endsWith(".zip"));
  if (mod) {
    return {
      name: folder.name,
      file: mod.name,
    };
  }
  return null;
}).filter((mod) => mod !== null);


Deno.serve((req: Request) => {
  const url = new URL(req.url);
  if (url.pathname === "/modpack.json") {
    return new Response(JSON.stringify(omega))
  }
  if (url.pathname.startsWith("/mods/")) {
    const modname = url.pathname.slice(6);
    const mod = mods.find((mod) => mod?.file === modname);
    if (!mod) {
      return new Response("Mod does not exist", { status: 404 });
    }
    const modFilePath = `./mods/${mod.name}/dist/${mod.file}`;
    if (existsSync(`./mods/${mod.name}/dist`) && existsSync(modFilePath)) {
      return new Response(Deno.readFileSync(modFilePath), { headers: { "Content-Type": "application/zip" } });
    } else {
      return new Response("Mod does not exist", { status: 404 });
    }
  }
  if (url.pathname.startsWith("/config/")) {
    const configname = url.pathname.slice(8);
    const configFilePath = `./config/${configname}`;
    if (existsSync(configFilePath)) {
      return new Response(Deno.readFileSync(configFilePath), { headers: { "Content-Type": "application/json" } });
    } else {
      return new Response("Config does not exist", { status: 404 });
    }
  }
  return new Response("Not found", { status: 404 })
})