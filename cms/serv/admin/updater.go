package admin

import (
	"context"
	"errors"

	"github.com/cms/admin/dto/hp"
	"github.com/cms/admin/dto/hq"
	"github.com/cms/db"
	"github.com/gin-gonic/gin"
)
func (t *Cms) Updater(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req hq.UpdaterReq
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

	switch req.Target {
	case "product":
		err := t.ProductUpdater(c.Request.Context(), req)
		hp.Response(c, nil, err)
	case "site":

		err := t.SiteUpdater(c.Request.Context(), req)
		if err != nil {
			hp.Error[any](c, err.Error())
			return
		}
		hp.Response(c, nil, err)
	case "image":
		// category, err := t.Q.(c.Request.Context(), req.Id)
		// hp.Response(c,category, err)
	default:
		hp.Error[any](c, "Not Found")
	}
}

func (t *Cms) SiteUpdater(ctx context.Context, params hq.UpdaterReq) error {
		if params.Dtype == "status" {

			site, err := t.Q.GetSite(ctx, params.Id)
			if err != nil {
				return err	
			}
			status := int16(params.Value.(float64))
			if status == 0 {
			    AddDomain(site.Domain)
			} else {
			    DeleteDomain(site.Domain)
			}

			err = t.Q.SwitchSiteStatus(ctx, db.SwitchSiteStatusParams{
				ID:     params.Id,
				Status: status,
			})
			if err != nil {
				return err
			}
			return nil
		}
	return nil
}

func (t *Cms) ProductUpdater(ctx context.Context, params hq.UpdaterReq) error {
    // 从查询参数中获取产品 handle
	switch params.Dtype {
	case "status":
		err := t.Q.UpdateProductStatus(ctx, db.UpdateProductStatusParams{
			ID:     params.Id,
			Status: int16(params.Value.(float64)),
		})
		return err
	case "sku_num":
		err := t.Q.UpdateProductMainSkuNum(ctx, db.UpdateProductMainSkuNumParams{
			ID:     params.Id,
			SkuNum: int16(params.Value.(float64)),
		})
		return err
	default:
		return errors.New("Not Found")
	}
}