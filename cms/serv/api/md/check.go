// middleware/admin_auth.go
package md

import (
	"log"

	"github.com/cms/utils"
	"github.com/gin-gonic/gin"
)

func Check() gin.HandlerFunc {
    return func(c *gin.Context) {
		if (c.Request.Method=="OPTIONS"){
			c.Next();
			return 
		}
		origin := c.GetHeader("Origin")
		if origin == "" {
			log.Println("origin error")
		    c.Abort()
			return 
		}
		sid := utils.Fnv1a32(origin)
    	c.Set("sid", int64(sid))
		c.Set("domain", origin)
		c.Next()
    }
}
