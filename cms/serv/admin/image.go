package admin

import (
	"net/http"

	"github.com/cms/db"
	"github.com/cms/dto/http/rep"
	"github.com/gin-gonic/gin"
)
func (t *Cms)ListImages(c *gin.Context) {
	images, err := t.DB.ListImages(c.Request.Context(), db.ListImagesParams{
		Limit:  100,
		Offset: 0,
	})
	if err != nil {
		rep.Error[any](c, http.StatusInternalServerError, err.Error())
		return
	}
	rep.Success[any](c, images)
}