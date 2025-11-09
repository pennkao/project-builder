// API 是所有 handler 的容器，持有数据库查询接口
package api

import (
	"github.com/cms/db"
)

type API struct {
    DB *db.Queries
}

// New 创建新的 API 实例
func NewApi(queries *db.Queries) *API {
    return &API{
        DB: queries,
    }
}