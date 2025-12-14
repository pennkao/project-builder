package admin

import (
	"github.com/cms/admin/dto/hp"
	"github.com/cms/db"
	"github.com/gin-gonic/gin"
)

func (t *Cms) CreatePage(c *gin.Context) {
	var page db.CreatePageParams
	if err := c.ShouldBindJSON(&page); err != nil {
		hp.Error[any](c, err.Error())
		return
	}

	if err := t.Q.CreatePage(c.Request.Context(), page); err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	hp.Success[any](c, nil)
}

func (t *Cms) UpdatePage(c *gin.Context) {
	var page db.UpdatePageParams
	if err := c.ShouldBindJSON(&page); err != nil {
		hp.Error[any](c, err.Error())
		return
	}

	if err := t.Q.UpdatePage(c.Request.Context(), page); err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	hp.Success[any](c, nil)
}