#!/bin/bash
# ==============================
# 🧩 Git 一键提交脚本
# 自动添加、提交、推送当前分支
# ==============================

# 确保脚本在 git 仓库中执行
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "❌ 当前目录不是 Git 仓库"
  exit 1
fi

# 获取当前分支名称
branch=$(git rev-parse --abbrev-ref HEAD)
echo "当前分支: $branch"

# 显示当前变更
git status -s
echo

# 输入提交说明
read -p "请输入提交说明（默认: auto commit）: " msg
msg=${msg:-"auto commit"}

# 提交并推送
git add .
git commit -m "$msg" || {
  echo "⚠️ 没有改动可提交。"
  exit 1
}

git push origin "$branch"

echo "✅ 提交并推送完成！"
