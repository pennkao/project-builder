// middleware/admin_auth.go
package md

import (
	"github.com/gin-gonic/gin"
)

func AdminAuth() gin.HandlerFunc {
    return func(c *gin.Context) {
        // 跳过登录接口
        if c.Request.URL.Path == "/admin/login" {
            c.Next()
            return
        }

        token := c.GetHeader("Authorization")
        if token != "admin-token" { // 简单示例，实际用 JWT
			// c.String(http.StatusNotFound, "404 Not Found")
			// c.Redirect(http.StatusTemporaryRedirect, `https://www.google.com/search?q=%E8%93%9D%E8%89%B2&sitesearch=xiaoyakankan.com`)
			// c.Abort()
            // return
        } 
		c.Next()
    }
}
