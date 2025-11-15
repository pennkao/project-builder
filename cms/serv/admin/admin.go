package admin

import (
	"fmt"

	"github.com/cms/db"
	"github.com/cms/dto/http/hp"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/gin-gonic/gin"
)

// internal/http/handler.go
type Cms struct {
    Q *db.Queries
	Db *pgxpool.Pool
}

func NewCms(db *pgxpool.Pool, query *db.Queries) *Cms {
    return &Cms{Q:query, Db:db}
}


func (t *Cms) Dispatcher(c *gin.Context) {
	fmt.Println("path", c.Param("path"))
	path := c.Param("path")
	switch path {
	case "/file/upload":
		fileUpload(c)
	case "/list-products":
		t.ListProducts(c)
	case "/list-images":
		t.ListImages(c)
	case "/product-handle-check":
		t.CheckProductHandle(c)
	case "/product-handle-count":
		t.GetProductHandleCount(c)
	case "/add-product":
		t.CreateProductMain(c)
	case "/add-product-options":
		t.CreateProductOptions(c)
	case "/add-product-skus":
		t.CreateProductSkus(c)
	case "/add-product-content":
		t.CreateProductContent(c)
	case "/add-product-details":
		t.CreateProductDetails(c)
	case "/add-product-sku-json":
		t.CreateProductSkuJson(c)
	case "/delete":
		t.Deleter(c)
	case "/fetch":
		t.Fetcher(c)
	default:
		hp.Error[any](c, "Not Found")
	}

}