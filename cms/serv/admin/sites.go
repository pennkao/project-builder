package admin

import (
	"fmt"

	"github.com/cms/admin/dto/hp"
	"github.com/cms/db"
	"github.com/gin-gonic/gin"
)

func (t *Cms) CreateSite(c *gin.Context) {
	// 从查询参数中获取产品 handle
	var req db.CreateSiteParams
	if err := c.ShouldBindJSON(&req); err != nil {
		hp.Error[any](c, err.Error())
		return
	}
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
    err := t.Q.UpdateSite(c.Request.Context(), req)
	if err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	hp.Success[any](c, nil) // 返回产品数量	
}