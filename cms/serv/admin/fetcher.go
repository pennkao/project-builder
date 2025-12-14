package admin

import (
	"github.com/cms/admin/dto/hp"
	"github.com/cms/admin/dto/hq"
	"github.com/cms/db"
	"github.com/cms/dbtypes"
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
		var ProductRep struct {
			Product db.Product `json:"product"`
			Skus []db.ProductSku `json:"skus"`
			Options dbtypes.JSON `json:"options"`
			Details db.GetProductDetailsRow `json:"details"`
			Content string `json:"content"`
		}
		var err error
		ProductRep.Product, err = t.Q.GetProduct(c.Request.Context(), req.Id)
		if (err!=nil){
			hp.Response(c,nil, err)
			return 
		}
		ProductRep.Skus, err = t.Q.GetProductSkus(c.Request.Context(), req.Id)
		if (err!=nil){
			hp.Response(c,nil, err)
			return 
		}
		ProductRep.Options, err = t.Q.GetProductOptions(c.Request.Context(), req.Id)
		if (err!=nil){
			hp.Response(c,nil, err)
			return 
		}
		ProductRep.Details, err = t.Q.GetProductDetails(c.Request.Context(), req.Id)
		if (err!=nil){
			hp.Response(c,nil, err)
			return 
		}
		ProductRep.Content, err = t.Q.GetProductContent(c.Request.Context(), req.Id)
		if (err!=nil){
			hp.Response(c,nil, err)
			return 
		}		
		hp.Response(c,ProductRep, err)

	case "site":
		content, err := t.Q.GetSite(c.Request.Context(), req.Id)
		hp.Response(c,content, err)
	case "page":
		page, err := t.Q.GetPage(c.Request.Context(), req.Id)
		hp.Response(c,page, err)
	default:
		hp.Error[any](c, "Not Found")
	}
}