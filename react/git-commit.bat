@echo off
:: ======================================
:: 🚀 Git Auto Commit Script (English only)
:: Supports: auto detection + custom message
:: ======================================

chcp 65001 >nul

:: Verify git repo
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo ❌ Not a git repository.
  exit /b
)

:: Get branch name
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set branch=%%i
echo 🪴 Current branch: %branch%
echo.

:: Check if there are changes
for /f %%i in ('git status --porcelain') do set changes=1
if not defined changes (
  echo ✅ No changes to commit.
  exit /b
)

:: Handle custom message (if provided)
set msg=%*
if "%msg%"=="" (
  for /f "tokens=1,*" %%a in ('git status -s') do (
    if "%%a"=="A" set msg=add: new files committed
    if "%%a"=="M" set msg=update: modified files
    if "%%a"=="D" set msg=delete: removed files
  )
  if "%msg%"=="" set msg=auto commit
)

git add .
git commit -m "%msg%"
if errorlevel 1 (
  echo ⚠️ Nothing to commit.
  exit /b
)

git push origin %branch%
echo ✅ %msg% -> gitpushed.log to %branch%
pause
