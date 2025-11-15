package admin

import (
	"github.com/cms/db"
	"github.com/cms/dto/http/hp"
	"github.com/gin-gonic/gin"
)
func (t *Cms)ListImages(c *gin.Context) {
	images, err := t.Q.ListImages(c.Request.Context(), db.ListImagesParams{
		Limit:  100,
		Offset: 0,
	})
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	hp.Success(c, images)
}