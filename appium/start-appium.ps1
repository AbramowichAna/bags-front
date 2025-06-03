# Cargar las variables desde .env
Get-Content .env | ForEach-Object {
    if ($_ -match "^\s*([^#][^=]+?)\s*=\s*(.+)$") {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [System.Environment]::SetEnvironmentVariable($name, $value, 'Process')
    }
}

# Ejecutar Appium
appium server --allow-insecure chromedriver_autodownload --base-path /wd/hub
