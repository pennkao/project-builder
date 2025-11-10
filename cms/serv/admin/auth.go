// api/admin.go
package admin

import (
	"github.com/cms/dto/http/rep"
	"github.com/cms/dto/http/req"

	"github.com/gin-gonic/gin"
)

// 登录接口，不验证
func (t *Cms)Login(c *gin.Context) {
	var request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := req.Json(c, &request); err != nil {
		rep.Error[any](c, 400, "Invalid request body")
		return
	}
	if request.Email != "pennkao@163.com" || request.Password != "@z90012m" {
		rep.Error[any](c, 401, "Invalid email or password")
		return
	}
	rep.Success[any](c, gin.H{"token": "admin-token"})
}

// 需要验证
func (t *Cms)AdminList(c *gin.Context) {
    c.JSON(200, gin.H{"message": "AdminList placeholder"})
	rep.Success[any](c, gin.H{"adminList": []gin.H{
		{"id": 1, "name": "admin1"},
		{"id": 2, "name": "admin2"},
	}})
}
