// api/admin.go
package admin

import "github.com/gin-gonic/gin"

// 登录接口，不验证
func AdminLogin(c *gin.Context) {
    c.JSON(200, gin.H{"message": "AdminLogin placeholder"})
}

// 需要验证
func AdminList(c *gin.Context) {
    c.JSON(200, gin.H{"message": "AdminList placeholder"})
}
