// API 是所有 handler 的容器，持有数据库查询接口
package api

import (
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


// /:path/:sid
func (t *API) Dispatch(c *gin.Context) {

	path := c.Param("path")
	switch path {
	case "products": 
		t.GetProductList(c)
	case "product":
		t.GetProduct(c)
	case "content":
		t.GetProductContent(c)
	case "collections":
		t.GetProductList(c)
	case "site":
		t.GetSite(c)
		
	case "plogin":
		t.Plogin(c)
	case "order":
		t.CreateOrderLog(c)
	case "google":
		t.CreateLogs(c)
	default:
		// resp.Error[any](c, "")
	}

}



