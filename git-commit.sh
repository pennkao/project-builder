#!/bin/bash
# ======================================
# 🚀 Git Auto Commit Script (English only)
# Automatically adds, commits and pushes
# ======================================

# Ensure we’re inside a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Not a git repository."
  exit 1
fi

# Get current branch
branch=$(git rev-parse --abbrev-ref HEAD)
echo "🪴 Current branch: $branch"
echo

# Check status
status=$(git status -s)

if [ -z "$status" ]; then
  echo "✅ No changes to commit."
  exit 0
fi

# Build commit message automatically
msg="auto commit"

if echo "$status" | grep -q "^A "; then
  msg="add: new files committed"
elif echo "$status" | grep -q "^M "; then
  msg="update: modified files"
elif echo "$status" | grep -q "^D "; then
  msg="delete: removed files"
fi

# Add all changes
git add .

# Commit with auto message
git commit -m "$msg" || {
  echo "⚠️ Nothing to commit."
  exit 1
}

# Push to origin
git push origin "$branch"

echo "✅ $msg -> pushed to $branch"
