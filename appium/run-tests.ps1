# Cargar las variables desde .env
Get-Content .env | ForEach-Object {
    if ($_ -match "^\s*([^#][^=]+?)\s*=\s*(.+)$") {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [System.Environment]::SetEnvironmentVariable($name, $value, 'Process')
    }
}

# Ejecutar los tests
npx wdio run wdio.conf.ts --spec ./test/specs/landing.e2e.ts
