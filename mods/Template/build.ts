import { Err } from "https://deno.land/x/eav@1.0.1/mod.ts";

const err = new Err("Error", "This is an error message");
console.error(err);

// const decoder = new TextDecoder();

// async function cmd(exe: string, args?: string) {
//   const command = new Deno.Command(exe, {
//     args: args?.split(" "),
//   })
//   const output = await command.output();
//   const stdout = decoder.decode(output.stdout);
//   if (output.success) {
//     return stdout;
//   }
//   return new Err("Error", stdout);
// }

// cmd("C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe", "C:/Users/muell/AppData/Roaming/npm/tsc.ps1 build.ts").then(console.log).catch(console.error);
