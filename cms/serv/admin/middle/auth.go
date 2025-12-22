// middleware/admin_auth.go
package middle

import (
	"net/http"
	"strings"

	"github.com/cms/admin/define"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func AdminAuth() gin.HandlerFunc {
    return func(c *gin.Context) {
		//接口必须有reffer
        if c.Request.Method == http.MethodPost && (c.Request.Referer() == "" || !strings.Contains(c.Request.Referer(),  c.Request.Host)){
            c.AbortWithStatus(http.StatusNotFound)
			return 
        }

		//登陆验证
        value, err := c.Cookie(define.CookieKey)
        if err != nil || value == "" { // 简单示例，实际用 JWT
			// c.String(http.StatusNotFound, "404 Not Found")
			// c.Redirect(http.StatusTemporaryRedirect, `https://www.google.com/search?q=%E8%93%9D%E8%89%B2&sitesearch=xiaoyakankan.com`)
			c.AbortWithStatus(http.StatusNotFound)
            return
        } 
		session := sessions.Default(c)
		if session.Get(value) == nil || session.Get(value) != "admin" {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}
		
		c.Next()
    }
}
