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
	case "images":
		// category, err := t.Q.(c.Request.Context(), req.Id)
		// hp.Response(c,category, err)
	default:
		hp.Error[any](c, "Not Found")
	}
}

func (t *Cms) ProductUpdater(ctx context.Context, params hq.UpdaterReq) error {
    // 从查询参数中获取产品 handle
	switch params.Dtype {
	case "status":
		err := t.Q.UpdateProductStatus(ctx, db.UpdateProductStatusParams{
			ID:     params.Id,
			Status: 1,
		})
		return err
	case "sku_num":
		err := t.Q.UpdateProductMainSkuNum(ctx, db.UpdateProductMainSkuNumParams{
			ID:     params.Id,
			SkuNum: 1,
		})
		return err
	default:
		return errors.New("Not Found")
	}
}