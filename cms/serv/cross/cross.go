package cross

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/cms/admin"
	"github.com/gin-gonic/gin"
)

func Cross() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		xorigin := c.GetHeader("X-Origin")
		fmt.Println("origin", origin, xorigin)
		if origin != "" || xorigin != "" {
			if xorigin != "" {
				origin = xorigin
			}
			if _, ok := admin.Origins[origin]; ok {
				c.Header("Access-Control-Allow-Origin", origin)
				c.Header("Access-Control-Allow-Credentials", "true")
			}
		}
		// Preflight (OPTIONS) 必须在 handler 之前处理
		if c.Request.Method == "OPTIONS" {
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
			c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, X-Requested-With, X-Requested-Time, X-Tenant-ID")
			c.Header("Access-Control-Max-Age", strconv.FormatInt(int64(12*time.Hour.Seconds()), 10))
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		// handler 只执行一次
		c.Next()
	}
}
