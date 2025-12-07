package api

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (t *API) GetSite(c *gin.Context) {
	sid := c.GetInt64("sid")
	if (sid==0){
		log.Println("error sid")
		return
	}
	
	site, err := t.Q.FetchSite(c, sid)
	if err != nil {
		log.Println(err.Error())
		return
	}
	c.JSON(http.StatusOK, site)
}