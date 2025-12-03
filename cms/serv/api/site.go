package api

import (
	"strconv"

	"github.com/cms/api/dto/resp"
	"github.com/gin-gonic/gin"
)

func (t *API) GetSite(c *gin.Context) {
	// 从查询参数中获取产品 handle
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		resp.Error[any](c, "invalid id")
		return
	}
	site, err := t.Q.FetchSite(c, id)
	if err != nil {
		resp.Error[any](c, err.Error())
		return
	}
	resp.Success(c, site)
}