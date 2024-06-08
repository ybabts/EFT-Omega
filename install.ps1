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

# Fetches the latest version of the modpack
Write-Host "Fetching latest version of the modpack..." -ForegroundColor $defaultTextColor
$jsonResponse = Invoke-WebRequest -Uri "https://eftomega.deno.dev/"

# Converts the JSON response to a PowerShell object
$modpack = $jsonResponse.Content | ConvertFrom-Json

# Display the modpack version
Write-Host "Modpack version: $($modpack.version)" -ForegroundColor Yellow

# List of mod urls
$urls = $modpack.urls
# List of Google Drive mod urls
$googledriveurls = $modpack.googleDriveUrls
# List of mods with standard folder structure
$standardFolderStructure = $modpack.standardFolderStructure
# List of user mods
$userMods = $modpack.userMods
# List of mods that are only DLLs
$dllOnlyMods = $modpack.dllOnlyMods

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
foreach ($url in $googledriveurls.Keys) {
  $leaf = $url
  # if mod is already downloaded, skip
  if (Test-Path "./downloads/$($leaf)") {
    Write-Host "$($leaf) already downloaded. Skipping..." -ForegroundColor Yellow
    continue
  }
  Write-Host "Downloading $($leaf)..." -ForegroundColor $defaultTextColor
  Invoke-WebRequest -Uri $googledriveurls[$url] -OutFile  "./downloads/$($leaf)"
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