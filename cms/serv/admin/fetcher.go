package admin

import (
	"github.com/cms/dto/http/hp"
	"github.com/cms/dto/http/hq"
	"github.com/gin-gonic/gin"
)
func (t *Cms) Fetcher(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req hq.FetcherReq
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

	switch req.Target {
	case "product":
		product, err := t.Q.GetProduct(c.Request.Context(), req.Id)
		hp.Response(c,product, err)
	case "product-skus":
		skus, err := t.Q.GetProductSkus(c.Request.Context(), req.Id)
		hp.Response(c,skus, err)
	case "product-options":
		options, err := t.Q.GetProductOptions(c.Request.Context(), req.Id)
		hp.Response(c,options, err)
	case "product-details":
		details, err := t.Q.GetProductDetails(c.Request.Context(), req.Id)
		hp.Response(c,details, err)
	case "product-content":
		content, err := t.Q.GetProductContent(c.Request.Context(), req.Id)
		hp.Response(c,content, err)
	default:
		hp.Error[any](c, "Not Found")
	}
}