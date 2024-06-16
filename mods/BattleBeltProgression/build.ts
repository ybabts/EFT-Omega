import * as esbuild from "npm:esbuild@0.20.2";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@^0.10.3";
import mod from "./package.json" with { type: "json" };

// SPT Install location
const sptPath = "C:/SPT";

// removes dist folder if it exists
Deno.removeSync("./dist", { recursive: true });

// creates dist folder if it doesn't exist
Deno.mkdirSync("./dist", { recursive: true });

// creates dist/config folder if it doesn't exist
Deno.mkdirSync("./dist/config", { recursive: true });


for (const file of Deno.readDirSync("./config")) {
  Deno.copyFileSync(`./config/${file.name}`, `./dist/config/${file.name}`);
}

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ["./src/mod.ts"],
  outfile: "./dist/src/mod.js",
  bundle: true,
  format: "cjs",
  platform: "node",
  target: "es6"
});

esbuild.stop();

// removes SPT/user/mods/author-modname folder if it exists
Deno.removeSync(`${sptPath}/user/mods/${mod.author}-${mod.name}`, { recursive: true });

// creates SPT/user/mods/author-modname folder if it doesn't exist
Deno.mkdirSync(`${sptPath}/user/mods/${mod.author}-${mod.name}`, { recursive: true });

// copies dist folder to SPT/user/mods/author-modname folder
recursiveCopy("./dist", `${sptPath}/user/mods/${mod.author}-${mod.name}`)

// copies the package.json file to SPT/user/mods/author-modname folder
Deno.copyFileSync("./package.json", `${sptPath}/user/mods/${mod.author}-${mod.name}/package.json`);

function recursiveCopy(source: string, dest: string) {
  for (const file of Deno.readDirSync(source)) {
    if (file.isDirectory) {
      Deno.mkdirSync(`${dest}/${file.name}`, { recursive: true });
      recursiveCopy(`${source}/${file.name}`, `${dest}/${file.name}`);
    } else {
      Deno.copyFileSync(`${source}/${file.name}`, `${dest}/${file.name}`);
    }
  }
}