package admin

import (
	"github.com/cms/admin/dto/hp"
	"github.com/cms/admin/dto/hq"
	"github.com/gin-gonic/gin"
)
func (t *Cms) Deleter(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req hq.DeleterReq
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

	switch req.Target {
	case "product":
		err:=t.Q.BatchDeleteProducts(c.Request.Context(), req.Ids)
		if err!= nil {
			hp.Error[any](c,  err.Error())
			return
		}
		hp.Success[any](c, nil)
	case "site":
		site, err := t.Q.GetSite(c.Request.Context(), req.Ids[0])
		if err != nil {
			hp.Error[any](c,  err.Error())
			return
		}
		if site.Domain != "" {
			DeleteDomain(site.Domain)
		}

		err=t.Q.BatchDeleteSites(c.Request.Context(), req.Ids)
		if err!= nil {
			hp.Error[any](c,  err.Error())
			return
		}

		t.SyncSite(c, req.Ids[0], 0)	
		hp.Success[any](c, nil)
	case "order-log":
		err:=t.Q.BatchDeleteOrderLogs(c.Request.Context(), req.Ids)
		if err!= nil {
			hp.Error[any](c,  err.Error())
			return
		}	
		hp.Success[any](c, nil)
	case "log":
		err:=t.Q.BatchDeleteLogs(c.Request.Context(), req.Ids)
		if err!= nil {
			hp.Error[any](c,  err.Error())
			return
		}	
		hp.Success[any](c, nil)
	case "image":
		err:=t.Q.BatchDeleteImages(c.Request.Context(), req.Ids)
		if err!= nil {
			hp.Error[any](c,  err.Error())
			return
		}	
	case "page":
		err:=t.Q.BatchDeletePages(c.Request.Context(), req.Ids)
		if err!= nil {
			hp.Error[any](c,  err.Error())
			return
		}	
		hp.Success[any](c, nil)
	case "review":
		err:=t.Q.BatchDeleteReviews(c.Request.Context(), req.Ids)
		if err!= nil {
			hp.Error[any](c,  err.Error())
			return
		}	
		hp.Success[any](c, nil)
	case "customer-review":
		err:=t.Q.BatchDeleteCustomerReviews(c.Request.Context(), req.Ids)
		if err!= nil {
			hp.Error[any](c,  err.Error())
			return
		}	
		hp.Success[any](c, nil)
	default:
		hp.Error[any](c, "Not Found")
	}

}