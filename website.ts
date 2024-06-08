import { existsSync } from "https://deno.land/std@0.224.0/fs/exists.ts";

import { default as omega } from "./omega.json" with { type: "json" }

Deno.serve((req: Request) => {
  const url = new URL(req.url);
  if (url.pathname === "/modpack.json") {
    return new Response(JSON.stringify(omega))
  }
  if (url.pathname.slice(0, 6) === "/mods/") {
    if (!existsSync(`./mods/${url.pathname.slice(6)}`)) new Response("Mod does not exist", { status: 404 })
    return new Response(Deno.readFileSync(`./mods/${url.pathname.slice(6)}`), { headers: { "Content-Type": "application/zip" } })
  }
  return new Response("Not found", { status: 404 })
})