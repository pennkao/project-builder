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
		err := t.Q.DeleteProduct(c.Request.Context(), req.Id)
		if err != nil {
			hp.Error[any](c,  err.Error())
			return
		}
	default:
		hp.Error[any](c, "Not Found")
	}

    hp.Success[any](c, nil) // 返回产品数
}