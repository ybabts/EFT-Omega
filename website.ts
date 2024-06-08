// Write a basic deno webserver

const omega = {
  urls: [
    "https://github.com/DeadLeavez/Leaves-BarterEconomy/releases/download/1.0.5/leaves-bartereconomy.zip",
    "https://dev.sp-tarkov.com/Leaves/mods/releases/download/IOF/InventoryOrganizingFeatures.dll",
    "https://github.com/WelcomeToTarkov/PackNStrap/releases/download/Release/WTT-PackNStrap.rar",
    "https://github.com/space-commits/SPT-Realism-Mod-Client/releases/download/v1.2.2/Realism-Mod-v1.2.2-SPT-v3.8.3.zip",
    "https://github.com/WelcomeToTarkov/LittleDrummerBoy/releases/download/Release/WTT-LittleDrummerBoy.rar",
    "https://github.com/Amands2Mello/AmandsGraphics/releases/download/1.6.2/AmandsGraphics.1.6.2.zip",
    "https://github.com/p-kossa/nookys-swag-presets-spt/releases/download/v3.3.5/SWAG-Donuts-v3.3.5-SPT380.zip",
    "https://github.com/Solarint/SAIN/releases/download/2.3.3/SAIN-2.3.3-Release.7z",
    "https://github.com/Skwizzy/SPT-LootingBots/releases/download/v1.3.2-aki-3.8.0/Skwizzy-LootingBots-1.3.2.zip",
    "https://github.com/dwesterwick/SPTQuestingBots/releases/download/0.6.0/DanW-SPTQuestingBots.zip",
    "https://github.com/CJ-SPT/StashSearch/releases/download/V1.1.1/StashSearch.7z"
  ],
  googleDriveUrls: {
    "ServerValueModifier1.8.3.zip": "https://drive.google.com/uc?export=download&id=1hijGHUYpeLm8vPoPmX2JlGrp6h9JlzXB"
  },
  standardFolderStructure: [
    "AmandsGraphics.1.6.2.zip",
    "DanW-SPTQuestingBots.zip",
    "leaves-bartereconomy.zip",
    "Realism-Mod-v1.2.2-SPT-v3.8.3.zip",
    "SAIN-2.3.3-Release.7z",
    "Skwizzy-LootingBots-1.3.2.zip",
    "StashSearch.7z",
    "WTT-PackNStrap.rar",
    "WTT-LittleDrummerBoy.rar",
    "SWAG-Donuts-v3.3.5-SPT380.zip"
  ],
  userMods: [
    "ServerValueModifier1.8.3.zip"
  ],
  dllOnlyMods: [
    "InventoryOrganizingFeatures.dll"
  ]
}

Deno.serve(() => {
  return new Response(JSON.stringify(omega))
})