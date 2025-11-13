// API 是所有 handler 的容器，持有数据库查询接口
package api

import (
	"github.com/cms/db"
	"github.com/jackc/pgx/v5/pgxpool"
)

type API struct {
    Q *db.Queries
	Db *pgxpool.Pool
}

// New 创建新的 API 实例
func NewApi(db *pgxpool.Pool, query *db.Queries) *API {
    return &API{
        Q: query,
		Db: db,
    }
}