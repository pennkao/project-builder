package admin

import (
	"fmt"

	"github.com/cms/admin/dto/hp"
	"github.com/cms/db"
	"github.com/cms/ws"
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


func (t *Cms) Dispatch(c *gin.Context) {
	fmt.Println("path", c.Param("path"))
	path := c.Param("path")
	switch path {
	case "/ws":
		ws.WS(c)
	case "/file/upload":
		fileUpload(c)
	case "/delete":
		t.Deleter(c)
	case "/fetch":
		t.Fetcher(c)
	case "/list":
		t.Lister(c)
	case "spider":
		t.Spider(c)
	case "/updater":
		t.Updater(c)
	case "/bind-product-site":
		t.BindProductSite(c)
	case "/add-site":
		t.CreateSite(c)
	case "/update-site":
		t.UpdateSite(c)
	case "/add-images":
		t.AddImages(c)
	case "/product-handle-check":
		t.CheckProductHandle(c)
	case "/product-handle-count":
		t.GetProductHandleCount(c)
	case "/add-product/reivews":
		CrawlProductReviwes(c)
	case "/add-product":
		t.CreateProductMain(c)
	case "/update-product":
		t.UpdateProductMain(c)
	case "/add-product-options":
		t.CreateProductOptions(c)
	case "/update-product-options":
		t.UpdateProductOptions(c)
	case "/add-product-skus":
		t.CreateProductSkus(c)
	case "/update-product-skus":
		t.UpdateProductSkus(c)
	case "/add-product-content":
		t.CreateProductContent(c)
	case "/update-product-content":
		t.UpdateProductContent(c)
	case "/add-product-details":
		t.CreateProductDetails(c)
	case "/update-product-details":
		t.UpdateProductDetails(c)
	case "/add-product-sku-json":
		t.CreateProductSkuJson(c)
	case "/update-product-sku-json":
		t.UpdateProductSkuJson(c)
	default:
		hp.Error[any](c, "Not Found")
	}

}