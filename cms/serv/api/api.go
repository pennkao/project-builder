// API 是所有 handler 的容器，持有数据库查询接口
package api

import (
	"fmt"

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

func (t *API) Dispatcher(c *gin.Context) {
	path := c.Param("path")
	switch path {
	case "products":
		t.GetProductList(c)
	default:
		resp.Error[any](c, "not found")
	}
}

func (t *API) DispatchDetail(c *gin.Context) {
	fmt.Println("path", c.Param("path"))
	path := c.Param("path")
	switch path {
	case "product": 
		t.GetProductByHandle(c)
	case "product-detail":
		t.GetProductDetails(c)
		case "product-options":
		t.GetProductOptions(c)
		case "product-skus":
			t.GetProductSkus(c)
	default:
		resp.Error[any](c, "not found111")
	}
}