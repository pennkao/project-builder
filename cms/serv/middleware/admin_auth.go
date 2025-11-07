// middleware/admin_auth.go
package middleware

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

        // token := c.GetHeader("Authorization")
        // if token != "admin-token" { // 简单示例，实际用 JWT
        //     c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
        //     return
        // }

        c.Next()
    }
}
