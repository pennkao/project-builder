#https://github.com/sqlc-dev/sqlc/releases

# 创建数据库和用户
psql -U postgres -c "CREATE DATABASE vtx_cms;"
psql -U postgres -c "CREATE USER dproot WITH PASSWORD '123456';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE vtx_cms TO dproot;"
psql -U postgres -c "GRANT CREATE ON SCHEMA public TO dproot;"

# 验证
psql -U dproot -d vtx_cms -c "\dt"