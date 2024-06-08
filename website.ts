// Write a basic deno webserver

import { default as omega } from "./omega.json" with { type: "json" }

Deno.serve(() => {
  return new Response(JSON.stringify(omega))
})