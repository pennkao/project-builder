package admin

import (
	"github.com/cms/admin/dto/hp"
	"github.com/gin-gonic/gin"
)
func (t *Cms) Spider(c *gin.Context) {
	var request struct {
		Url string `json:"url"`
	}
	if err := c.ShouldBindJSON(&request); err != nil {
		hp.Error[any](c, "Invalid request body")
		return
	}
}