package api

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (t *API) GetSite(c *gin.Context) {
	// 从查询参数中获取产品 handle
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		log.Println(err.Error())
		return
	}
	site, err := t.Q.FetchSite(c, id)
	if err != nil {
		log.Println(err.Error())
		return
	}
	c.JSON(http.StatusOK, site)
}