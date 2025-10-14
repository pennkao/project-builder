@echo off
:: ======================================
:: 🚀 Git Auto Commit Script (English only)
:: Automatically adds, commits and pushes
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

:: Determine commit type
set msg=auto commit
for /f "tokens=1,*" %%a in ('git status -s') do (
  if "%%a"=="A" set msg=add: new files committed
  if "%%a"=="M" set msg=update: modified files
  if "%%a"=="D" set msg=delete: removed files
)

:: ===== Check & Create gitpushed.log in current dir =====
if not exist "%cd%\gitpushed.log" (
  echo Creating gitpushed.log ...
  type nul > "%cd%\gitpushed.log"
)

:: ===== Ensure it's ignored =====
if exist "%cd%\.gitignore" (
  findstr /C:"gitpushed.log" "%cd%\.gitignore" >nul 2>&1
  if errorlevel 1 (
    echo gitpushed.log >> "%cd%\.gitignore"
    echo Added gitpushed.log to .gitignore
  )
)



:: Commit and push
git add .
git commit -m "%msg%"
if errorlevel 1 (
  echo ⚠️ Nothing to commit.
  exit /b
)

git push origin %branch%
echo [%date% %time%] ✅ %msg% -> pushed to %branch% >> gitpushed.log

