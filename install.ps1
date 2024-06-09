$server = "https://eftomega.deno.dev"
# $server = "http://localhost:8000"

$defaultTextColor = [System.ConsoleColor]::White
$ProgressPreference = 'SilentlyContinue' # Suppress progress bar  

Write-Host ""
Write-Host "---------------------------------------------" -ForegroundColor Green
Write-Host "EFT Omega Modpack installer created by ybabts" -ForegroundColor Green
Write-Host "---------------------------------------------" -ForegroundColor Green
Write-Host ""
Write-Host "This script will download and install the latest version of the EFT Omega Modpack." -ForegroundColor $defaultTextColor
Write-Host ""

# Check if user has 7-Zip installed
Write-Host "Checking if 7-Zip is installed..." -ForegroundColor $defaultTextColor
$7zipInstalled = Test-Path "C:\Program Files\7-Zip\7z.exe"

if (-not $7zipInstalled) {
  # Download 7-Zip
  $7zipUrl = "https://www.7-zip.org/a/7z1900-x64.exe"
  $7zipInstaller = "$PWD\7z1900-x64.exe"
  Write-Host "7-Zip is not installed. Downloading 7-Zip..." -ForegroundColor $defaultTextColor
  Invoke-WebRequest -Uri $7zipUrl -OutFile $7zipInstaller -NoProgress

  # Install 7-Zip
  Write-Host "Running 7-Zip installer..." -ForegroundColor $defaultTextColor
  Start-Process -FilePath $7zipInstaller -ArgumentList "/S" -Wait

  # Remove the installer
  Write-Host "Removing 7-Zip installer..." -ForegroundColor $defaultTextColor
  Remove-Item -Path $7zipInstaller
}

# Checks if the SPT folder exists
if (Test-Path "./SPT") {
  # Removes the SPT folder
  Write-Host "Removing the SPT folder..." -ForegroundColor $defaultTextColor
  Remove-Item -Path "./SPT" -Recurse -Force
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
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
  }
}


# Fetches the latest version of the modpack
Write-Host "Fetching latest version of the modpack..." -ForegroundColor Green
try {
  $jsonResponse = Invoke-WebRequest -Uri "${server}/modpack.json"
} catch {
  Write-Host "Error occurred while fetching the modpack: $_" -ForegroundColor Red
  Write-Host "Press any key to exit..."
  $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
  exit
}

# Converts the JSON response to a PowerShell object
$modpack = $jsonResponse.Content | ConvertFrom-Json

# Display the modpack version
Write-Host "Modpack version: $($modpack.version)" -ForegroundColor Yellow

# List of mod urls
$urls = $modpack.urls
# List of Google Drive mod urls
$googledriveurls = @{}
$modpack.googleDriveUrls.PSObject.Properties | ForEach-Object { $googledriveurls[$_.Name] = $_.Value }
# List of mods with standard folder structure
$standardFolderStructure = $modpack.standardFolderStructure
# List of user mods
$userMods = $modpack.userMods
# List of mods that are only DLLs
$dllOnlyMods = $modpack.dllOnlyMods
# Mod order list
$modOrder = $modpack.modOrder
# Config files list
$config = @{}
$modpack.config.PSObject.Properties | ForEach-Object { $config[$_.Name] = $_.Value }

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

# Creates the mod order file
Write-Host "Creating mod order file..." -ForegroundColor $defaultTextColor
$order = @{"order"=$modOrder} | ConvertTo-Json
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
# Notably for JSON files, the BOM isn't valid JSON, so we need to remove it
[System.IO.File]::WriteAllText("./SPT/user/mods/order.json", $order, $utf8NoBom)

# Downloads all the config files
Write-Host "Downloading config files..." -ForegroundColor $defaultTextColor
foreach ($configFile in $config.Keys) {
  $configUrl = $config[$configFile]
  $configPath = Join-Path -Path "./SPT" -ChildPath $configFile
  Write-Host "Downloading $configFile..." -ForegroundColor $defaultTextColor
  Invoke-WebRequest -Uri $configUrl -OutFile $configPath
}

# Asks the user to select their SPT folder
Write-Host "Please select your SPT folder..." -ForegroundColor Green
Add-Type -AssemblyName System.Windows.Forms

$folderBrowser = New-Object System.Windows.Forms.FolderBrowserDialog
$folderBrowser.Description = "Please select your SPT folder"
$folderBrowser.RootFolder = [Environment+SpecialFolder]::MyComputer

if ($folderBrowser.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
    $SPTFolder = $folderBrowser.SelectedPath
} else {
    Write-Host "No folder selected. Exiting script." -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Checks if the SPT Folder exists
if (-not (Test-Path $SPTFolder)) {
  Write-Host "SPT Folder does not exist. Please enter a valid path." -ForegroundColor Red
  Write-Host "Press any key to exit..."
  $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
  exit
}

# Checks if the SPT Folder contains Aki.Launcher.exe and EscapeFromTarkov.exe
if (-not (Test-Path "$SPTFolder\Aki.Launcher.exe") -or -not (Test-Path "$SPTFolder\EscapeFromTarkov.exe")) {
  Write-Host "SPT Folder does not contain Aki.Launcher.exe and EscapeFromTarkov.exe. Please enter a valid path." -ForegroundColor Red
  exit
}

# Warns the user that they will be removing all mods in that install of SPT
Write-Host "SPT Folder: $SPTFolder \n" -ForegroundColor Yellow
Write-Host "-----------------------------------------------------------------------------------------------" -ForegroundColor Red
Write-Host "Warning: This will remove all mods in your SPT folder. Are you sure you want to continue? (Y/N)" -ForegroundColor Red
Write-Host "-----------------------------------------------------------------------------------------------" -ForegroundColor Red
$confirmation = Read-Host "Y/N";

if ($confirmation -ne "Y") {
  Write-Host "Exiting script..." -ForegroundColor Red
  Write-Host "Press any key to exit..."
  $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
  exit
}

# Removes all user mods
Write-Host "Removing all user mods..." -ForegroundColor $defaultTextColor
Remove-Item -Path "$SPTFolder\user\mods\*" -Recurse -Force

# Moves the spt folder from /SPT/BepInEx/plugins to /SPT/BepInEx
Write-Host "Moving spt folder from /SPT/BepInEx/plugins to /SPT/BepInEx..." -ForegroundColor $defaultTextColor
Move-Item -Path "$SPTFolder/BepInEx/plugins/spt" -Destination "$SPTFolder/BepInEx" -Force

# Deletes all files in /SPT/BepInEx/plugins
Write-Host "Deleting all files in /SPT/BepInEx/plugins..." -ForegroundColor $defaultTextColor
Remove-Item -Path "$SPTFolder/BepInEx/plugins/*" -Recurse -Force

# Moves the spt folder back to /SPT/BepInEx/plugins
Write-Host "Moving spt folder back to /SPT/BepInEx/plugins..." -ForegroundColor $defaultTextColor
Move-Item -Path "$SPTFolder/BepInEx/spt" -Destination "$SPTFolder/BepInEx/plugins" -Force

# Copies the contents of the SPT Folder to the SPT Folder
Write-Host "Copying contents of SPT Folder to SPT Folder..." -ForegroundColor $defaultTextColor
Copy-Item -Path "./SPT/*" -Destination $SPTFolder -Recurse -Force

Write-Host "Installation complete! Welcome to Omega!" -ForegroundColor Green

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")