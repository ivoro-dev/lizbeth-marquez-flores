@echo off
cd /d "%~dp0"
echo Setting up Claude Code config...
if not exist .claude\commands mkdir .claude\commands
copy /Y setup\claude\commands\*.md .claude\commands\ >nul
copy /Y setup\claude\settings.json .claude\settings.json >nul
copy /Y setup\mcp.json .mcp.json >nul

echo Removing old scaffold files...
del /Q src\components\sections\hero.tsx src\components\sections\storytelling.tsx src\components\sections\branding.tsx src\components\sections\results.tsx src\components\sections\businesses.tsx 2>nul
del /Q src\components\motion\reveal.tsx 2>nul
del /Q src\content\podcasts.ts src\content\branding.ts src\content\results.ts src\content\businesses.ts 2>nul
del /Q tsconfig.tsbuildinfo 2>nul
rmdir /S /Q public\audio 2>nul
rmdir /S /Q public\images\profile public\images\branding public\images\results public\images\podcast 2>nul
rmdir /S /Q setup 2>nul

echo Installing packages...
call npm install

echo.
echo Done. Open this folder in VS Code, start Claude Code, type /next
pause
(goto) 2>nul & del "%~f0"
