package admin

import (
	"fmt"
	"strings"

	"github.com/cms/admin/dto/hp"
	"github.com/cms/db"
	"github.com/cms/utils"
	"github.com/gin-gonic/gin"
)

func (t *Cms) CreateSite(c *gin.Context) {
	// 从查询参数中获取产品 handle
	var req db.CreateSiteParams
	if err := c.ShouldBindJSON(&req); err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	req.Sid = int64(utils.Fnv1a32(strings.TrimSpace(req.Domain)))
	err := t.Q.CreateSite(c.Request.Context(), req)
	if err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	hp.Success[any](c, nil) // 返回产品数量
}

func (t *Cms) UpdateSite(c *gin.Context) {
    var req db.UpdateSiteParams
	if err := c.ShouldBindJSON(&req); err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	fmt.Println(req)
	req.Sid = int64(utils.Fnv1a32(strings.TrimSpace(req.Domain)))
    err := t.Q.UpdateSite(c.Request.Context(), req)
	if err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	hp.Success[any](c, nil) // 返回产品数量	
}