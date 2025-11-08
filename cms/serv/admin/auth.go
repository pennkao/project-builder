// api/admin.go
package admin

import (
	"github.com/cms/request"
	"github.com/cms/response"
	"github.com/gin-gonic/gin"
)

// 登录接口，不验证
func Login(c *gin.Context) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := request.Json(c, &req); err != nil {
		response.Error(c, 400, "Invalid request body")
		return
	}
	if req.Email != "pennkao@163.com" || req.Password != "@z90012m" {
		response.Error(c, 401, "Invalid email or password")
		return
	}
	response.Success(c, gin.H{"token": "admin-token"})
}

// 需要验证
func AdminList(c *gin.Context) {
    c.JSON(200, gin.H{"message": "AdminList placeholder"})
	response.Success(c, gin.H{"adminList": []gin.H{
		{"id": 1, "name": "admin1"},
		{"id": 2, "name": "admin2"},
	}})
}
