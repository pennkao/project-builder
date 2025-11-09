package admin

import (
	"net/http"

	"github.com/cms/db"
	"github.com/cms/response"
	"github.com/gin-gonic/gin"
)
func (t *Cms)ListImages(c *gin.Context) {
	images, err := t.DB.ListImages(c.Request.Context(), db.ListImagesParams{
		Limit:  100,
		Offset: 0,
	})
	if err != nil {
		response.Error(c, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(c, images)
}