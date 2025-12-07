package admin

import (
	"context"
	"log"

	"github.com/cms/admin/dto/hp"
	"github.com/cms/admin/dto/hq"
	"github.com/cms/com"
	"github.com/cms/utils"
	"github.com/gin-gonic/gin"
)

func (t *Cms) Lister(c *gin.Context) {

	page := com.NewPage(c)

	var req hq.ListerParamsReq
	if err := c.ShouldBindJSON(&req); err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	switch req.Target {
	case "product":
			where, fullWhere, args := utils.BuildDynamicQuery(req.Filter, req.Sort, page,  "uts")
			t.QueryProductList(c.Request.Context(), where,fullWhere, args, page)
			hp.Success[any](c, page)
	case "image":
			where, fullWhere, args := utils.BuildDynamicQuery(req.Filter, req.Sort, page,  "cts")
			t.QueryImagestList(c.Request.Context(), where,fullWhere, args, page)
			hp.Success[any](c, page)
	case "review":
			where, fullWhere, args := utils.BuildDynamicQuery(req.Filter, req.Sort, page,  "r.cts")
			t.QueryProductReviewsList(c.Request.Context(), where,fullWhere, args, page)
			hp.Success[any](c, page)
	case "log":
			where, fullWhere, args := utils.BuildDynamicQuery(req.Filter, req.Sort, page,  "ts")
			t.QueryLogsList(c.Request.Context(), where,fullWhere, args, page)
			hp.Success[any](c, page)
	case "order-log":
			where, fullWhere, args := utils.BuildDynamicQuery(req.Filter, req.Sort, page,  "cts")
			t.QueryOrderLogsList(c.Request.Context(), where,fullWhere, args, page)
			hp.Success[any](c, page)
	case "site":
			t.QuerySiteList(c.Request.Context(), page)
			hp.Success[any](c, page)
	default:
		hp.Error[any](c, "Not Found")
	}
}

func (t *Cms) QuerySiteList(ctx context.Context, page *com.PageResponse) {
    data,err:=t.Q.SiteList(ctx)
	if err!= nil{
		log.Println(err)
		return
	}
	page.SetTotal(int(len(data))) // 设置总记录数
	page.SetList(data) // 设置产品列表
}

func (t *Cms) QueryOrderLogsList(ctx context.Context, where,fullWhere string, args []interface{}, page *com.PageResponse) {

		count, err := t.Q.QueryOrderLogsCount(ctx, where, args)
		if err != nil || count<=0 {
			log.Println(err)
			return
		}
		data,err:=t.Q.QueryOrderLogsList(ctx, fullWhere , args)
		if err!= nil{
			log.Println(err)
			return
		}
		page.SetTotal(int(count)) // 设置总记录数
		page.SetList(data) // 设置产品列表
}

func (t *Cms) QueryLogsList(ctx context.Context, where,fullWhere string, args []interface{}, page *com.PageResponse) {
		count, err := t.Q.QueryLogsCount(ctx, where, args)
		if err != nil || count<=0 {
			log.Println(err)
			return
		}	

		data,err:=t.Q.QueryLogsList(ctx, fullWhere , args)
		if err!= nil{
			log.Println(err)
			return
		}
		page.SetTotal(int(count)) // 设置总记录数
		page.SetList(data) // 设置产品列表
}

func (t *Cms) QueryProductList(ctx context.Context, where,fullWhere string, args []interface{}, page *com.PageResponse) {
		count, err := t.Q.QueryProductCount(ctx, where, args)
		if err != nil || count<=0 {
			
			log.Println(err)
			return
		}	

		data,err:=t.Q.QueryProductList(ctx, fullWhere , args)
		if err!= nil{
			log.Println(err)
			return
		}
		page.SetTotal(int(count)) // 设置总记录数
		page.SetList(data) // 设置产品列表
}


func (t *Cms) QueryImagestList(ctx context.Context, where,fullWhere string, args []interface{}, page *com.PageResponse) {
		count, err := t.Q.QueryImageCount(ctx, where, args)
		if err != nil || count<=0 {
			log.Println(err)
			return
		}	

		data,err:=t.Q.QueryImageList(ctx, fullWhere , args)
		if err!= nil{
			log.Println(err)
			return
		}
		page.SetTotal(int(count)) // 设置总记录数
		page.SetList(data) // 设置产品列表
}
func (t *Cms) QueryProductReviewsList(ctx context.Context, where,fullWhere string, args []interface{}, page *com.PageResponse) {
		count, err := t.Q.QueryProductReviewsCount(ctx, where, args)
		if err != nil || count<=0 {
			log.Println(err)
			return
		}	

		data,err:=t.Q.QueryProductReviewsList(ctx, fullWhere , args)
		if err!= nil{
			log.Println(err)
			return
		}
		page.SetTotal(int(count)) // 设置总记录数
		page.SetList(data) // 设置产品列表
}