@echo off
cd /d "%~dp0"
echo Deutsch-App aciliyor: http://localhost:8080
echo Telefondan (ayni Wi-Fi): http://BILGISAYAR-IP:8080  (IP icin: ipconfig, "IPv4")
start "" http://localhost:8080
py -3 -m http.server 8080
