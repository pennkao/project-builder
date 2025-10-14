@echo off
:: ==============================
:: 🧩 Git 一键提交脚本
:: 自动添加、提交、推送当前分支
:: ==============================

:: 设置控制台编码（防止中文乱码）
chcp 65001 >nul

:: 检查是否在 Git 仓库中
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo ❌ 当前目录不是 Git 仓库
  exit /b
)

:: 获取当前分支名称
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set branch=%%i

echo 当前分支: %branch%

:: 自动检测变更文件
git status -s
echo.

:: 输入提交信息
set /p msg=请输入提交说明（默认: auto commit）：

if "%msg%"=="" set msg=auto commit

:: 添加所有改动并提交
git add .
git commit -m "%msg%"

if errorlevel 1 (
  echo ⚠️ 提交失败，请检查是否有改动。
  exit /b
)

:: 推送到远程分支
git push origin %branch%

echo ✅ 提交并推送完成！
pause
