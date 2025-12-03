// API 是所有 handler 的容器，持有数据库查询接口
package api

import (
	"github.com/cms/api/dto/resp"
	"github.com/cms/db"
	"github.com/gin-gonic/gin"
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


// /:path/:id
func (t *API) Dispatcher(c *gin.Context) {
	path := c.Param("path")
	switch path {
	case "product":
		t.GetProduct(c)
	case "content":
		t.GetProductContent(c)
	case "site":
		t.GetSite(c)
	default:
		resp.Error[any](c, "")
	}
}

// /:path
func (t *API) DispatchList(c *gin.Context) {
	path := c.Param("path")
	switch path {
	case "orders":
		t.CreateOrder(c)
	case "google":
		t.CreateLogs(c)
	case "products": 
		t.GetProductList(c)
	case "collections":
		t.GetProductList(c)
	default:
		resp.Error[any](c, "")
	}
}

