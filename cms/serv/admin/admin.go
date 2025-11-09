package admin

import (
	"net/http"

	"github.com/cms/db"
	"github.com/cms/response"
	"github.com/gin-gonic/gin"
)

// internal/http/handler.go
type Cms struct {
    DB *db.Queries
}

func NewCms(query *db.Queries) *Cms {
    return &Cms{DB:query}
}


func (t *Cms)Dispatcher(c *gin.Context) {
	path := c.Param("path")
	switch path {
	case "/list-products":
		t.ListProducts(c)
	case "/list-images":
		t.ListImages(c)
	case "/add-product":
		t.AddProduct(c)
	default:
		response.Error(c, http.StatusNotFound, "Not Found")
	}

}