// middleware/admin_auth.go
package middle

import (
	"net/http"
	"strings"

	"github.com/cms/admin/define"
	"github.com/gin-gonic/gin"
)

//登陆页面限制
func LoginCheck() gin.HandlerFunc {
    return func(c *gin.Context) {
		ua := strings.ToLower(c.GetHeader("User-Agent"))
		if ua == "" || strings.Contains(ua, "curl") ||
			strings.Contains(ua, "python") ||
			strings.Contains(ua, "bot") {
				c.AbortWithStatus(http.StatusNotFound)
				return
		}

		if c.Request.Method == http.MethodPost {
			c.Next()
			return
		}

		isLogin, err := c.Cookie(define.IsLoginKey)
		if err == nil && isLogin == "1" {
			c.Redirect(http.StatusFound, "/admin")
			return
		}

		c.Next()
    }
}


