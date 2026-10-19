@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist ".env" copy ".env.example" ".env" >nul
if not exist "node_modules\.bin\nest.cmd" (
  call npm config set cache "%LOCALAPPDATA%\npm-cache" --global
  call npm config set registry "https://registry.npmjs.org/" --global
  echo 正在安装后端依赖，请稍等...
  call npm install
)
echo 请确认 MySQL 已启动，然后启动 NestJS...
call npm run start:dev
