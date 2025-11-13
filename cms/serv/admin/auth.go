// api/admin.go
package admin

import (
	"github.com/cms/dto/http/hp"
	"github.com/cms/dto/http/hq"

	"github.com/gin-gonic/gin"
)

// 登录接口，不验证
func (t *Cms)Login(c *gin.Context) {
	var request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := hq.Json(c, &request); err != nil {
		hp.Error[any](c, "Invalid request body")
		return
	}
	if request.Email != "pennkao@163.com" || request.Password != "@z90012m" {
		hp.Error[any](c,  "Invalid email or password")
		return
	}
	hp.Success[any](c, gin.H{"token": "admin-token"})
}

// 需要验证
func (t *Cms)AdminList(c *gin.Context) {
    c.JSON(200, gin.H{"message": "AdminList placeholder"})
	hp.Success[any](c, gin.H{"adminList": []gin.H{
		{"id": 1, "name": "admin1"},
		{"id": 2, "name": "admin2"},
	}})
}
