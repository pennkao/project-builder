package admin

import (
	"context"

	"github.com/cms/com"
	"github.com/cms/dto/http/hp"
	"github.com/cms/dto/http/hq"
	"github.com/cms/utils"
	"github.com/gin-gonic/gin"
)
type QQQ struct {
	Price int64 `json:"price"`
}
func (t *Cms) Lister(c *gin.Context) {

	page := com.NewPage(c)

	var req hq.ListParamsReq
	if err := c.ShouldBindJSON(&req); err != nil {
		hp.Error[any](c, err.Error())
		return
	}

	switch req.Target {
	case "products":
			where, fullWhere, args := utils.BuildDynamicQuery(req.Filter, req.Sort, page,  "uts")
			t.QueryProductList(c.Request.Context(), where,fullWhere, args, page)
			hp.Success[any](c, page)
	case "images":
			where, fullWhere, args := utils.BuildDynamicQuery(req.Filter, req.Sort, page,  "cts")
			t.QueryImagestList(c.Request.Context(), where,fullWhere, args, page)
			hp.Success[any](c, page)
	default:
		hp.Error[any](c, "Not Found")
	}
}

func (t *Cms) QueryProductList(ctx context.Context, where,fullWhere string, args []interface{}, page *com.PageResponse) {
		count, err := t.Q.QueryProductCount(ctx, where, args)
		if err != nil || count<=0 {
			return
		}	

		data,err:=t.Q.QueryProductList(ctx, fullWhere , args)
		if err!= nil{
			return
		}
		page.SetTotal(int(count)) // 设置总记录数
		page.SetList(data) // 设置产品列表
}


func (t *Cms) QueryImagestList(ctx context.Context, where,fullWhere string, args []interface{}, page *com.PageResponse) {
		count, err := t.Q.QueryImageCount(ctx, where, args)
		if err != nil || count<=0 {
			return
		}	

		data,err:=t.Q.QueryImageList(ctx, fullWhere , args)
		if err!= nil{
			return
		}
		page.SetTotal(int(count)) // 设置总记录数
		page.SetList(data) // 设置产品列表
}