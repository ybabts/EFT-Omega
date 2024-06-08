$defaultTextColor = [System.ConsoleColor]::White

# Check if user has 7-Zip installed
Write-Host "Checking if 7-Zip is installed..." -ForegroundColor $defaultTextColor
$7zipInstalled = Test-Path "C:\Program Files\7-Zip\7z.exe"

if (-not $7zipInstalled) {
  # Download 7-Zip
  $7zipUrl = "https://www.7-zip.org/a/7z1900-x64.exe"
  $7zipInstaller = "$PWD\7z1900-x64.exe"
  Write-Host "7-Zip is not installed. Downloading 7-Zip..." -ForegroundColor $defaultTextColor
  Invoke-WebRequest -Uri $7zipUrl -OutFile $7zipInstaller

  # Install 7-Zip
  Write-Host "Running 7-Zip installer..." -ForegroundColor $defaultTextColor
  Start-Process -FilePath $7zipInstaller -ArgumentList "/S" -Wait

  # Remove the installer
  Write-Host "Removing 7-Zip installer..." -ForegroundColor $defaultTextColor
  Remove-Item -Path $7zipInstaller
}

# If directory does not exist, create it
$directories = @(
  "./downloads",
  "./SPT",
  "./SPT/BepInEx",
  "./SPT/BepInEx/plugins",
  "./SPT/user",
  "./SPT/user/mods"
)

Write-Host "Ensuring directories exist..." -ForegroundColor $defaultTextColor
foreach ($directory in $directories) {
  Write-Host "Checking if $directory exists..." -ForegroundColor $defaultTextColor
  if (-not (Test-Path $directory)) {
    Write-Host "$directory does not exist. Creating $directory..." -ForegroundColor $defaultTextColor
    New-Item -ItemType Directory -Path $directory
  }
}

# List of mod urls
$urls = @(
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
)

$googledriveurls = @{
  "ServerValueModifier1.8.3.zip" = "https://drive.google.com/uc?export=download&id=1hijGHUYpeLm8vPoPmX2JlGrp6h9JlzXB"
}

# List of mods with standard folder structure
$standardFolderStructure = @(
  "AmandsGraphics.1.6.2.zip",
  "DanW-SPTQuestingBots.zip"
  "leaves-bartereconomy.zip",
  "Realism-Mod-v1.2.2-SPT-v3.8.3.zip",
  "SAIN-2.3.3-Release.7z",
  "Skwizzy-LootingBots-1.3.2.zip",
  "StashSearch.7z",
  "WTT-PackNStrap.rar",
  "WTT-LittleDrummerBoy.rar",
  "SWAG-Donuts-v3.3.5-SPT380.zip"
)

$userMods = @(
  "ServerValueModifier1.8.3.zip"
)

# List of mods that are only DLLs
$dllOnlyMods = @(
  "InventoryOrganizingFeatures.dll"
)

# Downloads all the mods in the mod url list
Write-Host "Downloading mods..." -ForegroundColor $defaultTextColor
foreach ($url in $urls) {
  $leaf = Split-Path -Leaf $url;
  # if mod is already downloaded, skip
  if (Test-Path "./downloads/$($leaf)") {
    Write-Host "$($leaf) already downloaded. Skipping..." -ForegroundColor Yellow
    continue
  }
  Write-Host "Downloading $($leaf)..." -ForegroundColor $defaultTextColor
  Invoke-WebRequest -Uri $url -OutFile  "./downloads/$($leaf)"
}

# Downloads all the mods in the googledrive url list
Write-Host "Downloading mods from Google Drive..." -ForegroundColor $defaultTextColor
foreach ($url in $googledriveurls.GetEnumerator()) {
  $leaf = $url.Key;
  # if mod is already downloaded, skip
  if (Test-Path "./downloads/$($leaf)") {
    Write-Host "$($leaf) already downloaded. Skipping..." -ForegroundColor Yellow
    continue
  }
  Write-Host "Downloading $($leaf)..." -ForegroundColor $defaultTextColor
  Invoke-WebRequest -Uri $url.Value -OutFile  "./downloads/$($leaf)"
}

# Extracts all the mods with standard folder structure
Write-Host "Extracting standard folder structure mods..." -ForegroundColor $defaultTextColor
foreach ($rar in $standardFolderStructure) {
  Write-Host "Extracting $rar..." -ForegroundColor $defaultTextColor
  & "C:\Program Files\7-Zip\7z.exe" x "./downloads/$rar" -o"./SPT" -aoa -bso0 -bsp0
}

# Extracts all the user mods
Write-Host "Extracting user mods..." -ForegroundColor $defaultTextColor
foreach ($rar in $userMods) {
  Write-Host "Extracting $rar..." -ForegroundColor $defaultTextColor
  & "C:\Program Files\7-Zip\7z.exe" x "./downloads/$rar" -o"./SPT/user/mods" -aoa -bso0 -bsp0
}

# Moves all the DLL only mods from Downloads to the plugins folder
Write-Host "Moving DLL only mods..." -ForegroundColor $defaultTextColor
foreach ($dll in $dllOnlyMods) {
  Move-Item -Path "./downloads/$dll" -Destination "./SPT/BepInEx/plugins" -Force
}

Write-Host "Installation complete! Welcome to Omega!" -ForegroundColor Green