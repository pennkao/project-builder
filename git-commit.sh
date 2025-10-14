#!/bin/bash
# ======================================
# 🚀 Git Auto Commit Script (English only)
# Supports: auto detection + custom message
# ======================================

# Ensure we're inside a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Not a git repository."
  exit 1
fi

# Get current branch
branch=$(git rev-parse --abbrev-ref HEAD)
echo "🪴 Current branch: $branch"
echo

# Check for changes
status=$(git status -s)
if [ -z "$status" ]; then
  echo "✅ No changes to commit."
  exit 0
fi

# Use custom message if provided
if [ $# -gt 0 ]; then
  msg="$*"
else
  # Auto-generate commit message
  if echo "$status" | grep -q "^A "; then
    msg="add: new files committed"
  elif echo "$status" | grep -q "^M "; then
    msg="update: modified files"
  elif echo "$status" | grep -q "^D "; then
    msg="delete: removed files"
  else
    msg="auto commit"
  fi
fi

# Stage all and commit
git add .
git commit -m "$msg" || {
  echo "⚠️ Nothing to commit."
  exit 1
}

# Push to origin
git push origin "$branch"
echo "✅ $msg -> gitpushed.log to $branch"
