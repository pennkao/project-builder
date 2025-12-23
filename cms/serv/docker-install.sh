#!/bin/bash
set -e

# -----------------------------
# 1. 更新系统并安装依赖
# -----------------------------
echo "更新系统并安装依赖..."
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release

# -----------------------------
# 2. 添加 Docker 官方源
# -----------------------------
echo "添加 Docker 官方源..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# -----------------------------
# 3. 安装 Docker Engine
# -----------------------------
echo "安装 Docker Engine..."
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# -----------------------------
# 4. 启动 Docker 并设置开机自启
# -----------------------------
echo "启动 Docker..."
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl status docker --no-pager

# -----------------------------
# 5. 当前用户加入 docker 组
# -----------------------------
echo "将当前用户加入 docker 组..."
sudo usermod -aG docker $USER
echo "请退出终端重新登录或运行 'newgrp docker' 以使权限生效。"

# -----------------------------
# 6. 安装 docker-compose (旧版二进制，可选)
# -----------------------------
echo "安装旧版 docker-compose (可选)..."
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4)
sudo curl -L "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version || true

# -----------------------------
# 7. 测试 Docker 是否可用
# -----------------------------
echo "测试 Docker 是否可用..."
docker run --rm hello-world

# -----------------------------
# 8. 拉取 PostgreSQL 17 镜像
# -----------------------------
echo "拉取 PostgreSQL 17 镜像..."
docker pull postgres:17
echo "安装完成！你可以使用："
echo "docker run -d --name my-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydb -p 5432:5432 postgres:17"
