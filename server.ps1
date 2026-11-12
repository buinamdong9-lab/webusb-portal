# server.ps1 - Máy chủ HTTP tĩnh cục bộ cho WebUSB (Không cần Node.js / Python)
$port = 8686
$url = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()

Write-Host "==========================================================" -ForegroundColor Green
Write-Host " [OK] Server WebUSB da khoi dong tai: $url" -ForegroundColor Green
Write-Host " Dang tu dong mo trinh duyet..." -ForegroundColor Cyan
Write-Host " Nhan Ctrl + C trong cua so nay de dung server." -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Green

Start-Process $url

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $path = $context.Request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }
    $localFile = Join-Path $PSScriptRoot $path

    if (Test-Path $localFile -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($localFile)
        $ext = [System.IO.Path]::GetExtension($localFile).ToLower()
        $mime = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".js"   { "application/javascript; charset=utf-8" }
            ".css"  { "text/css; charset=utf-8" }
            ".png"  { "image/png" }
            ".json" { "application/json; charset=utf-8" }
            default { "application/octet-stream" }
        }
        $context.Response.ContentType = $mime
        $context.Response.ContentLength64 = $content.Length
        $context.Response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $context.Response.StatusCode = 404
    }
    $context.Response.Close()
}

