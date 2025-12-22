// api/admin.go
package admin

import (
	"fmt"
	"time"

	"github.com/cms/admin/define"
	"github.com/cms/admin/dto/hp"
	"github.com/cms/utils"
	"github.com/gin-contrib/sessions"

	"github.com/gin-gonic/gin"
)

// 登录接口，不验证
func (t *Cms)Login(c *gin.Context) {
	host := c.Request.Host
	var request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&request); err != nil {
		hp.Error[any](c, "Invalid request body")
		return
	}
	if request.Email != "pennkao@163.com" || request.Password != "@z90012m" {
		hp.Error[any](c,  "Invalid email or password")
		return
	}
	// session.Set(c, define.SessionKey, request.Email)
	fmt.Println(host)
	value := utils.SHA256(request.Email + request.Password + time.Now().Format(time.RFC3339))
	session := sessions.Default(c)
	session.Clear()

	session.Set(value, "admin")
	session.Save()

	// c.SetSameSite(http.SameSiteNoneMode)
	c.SetCookie(define.IsLoginKey, "1", 1800, "/the-door", host, false, true)
	c.SetCookie(define.CookieKey, value, 3600, "/admin", host, false, true)
	c.SetCookie(define.CookieKey, value, 3600, "/backend", host, false, true)
	hp.Success(c, gin.H{"token": value})
}

func (t *Cms)Logout(c *gin.Context){
	c.SetCookie(
		define.CookieKey, // cookie 名
		"",      // value 置空
		-1,      // MaxAge = -1 表示删除
		"/admin",     // Path，必须和原来一致
		"",      // Domain，必须和原来一致
		true,    // Secure（https）
		true,    // HttpOnly
	)
	c.SetCookie(
		define.CookieKey, // cookie 名
		"",      // value 置空
		-1,      // MaxAge = -1 表示删除
		"/backend",     // Path，必须和原来一致
		"",      // Domain，必须和原来一致
		true,    // Secure（https）
		true,    // HttpOnly
	)
		c.SetCookie(
		define.IsLoginKey, // cookie 名
		"",      // value 置空
		-1,      // MaxAge = -1 表示删除
		"/the-door",     // Path，必须和原来一致
		"",      // Domain，必须和原来一致
		true,    // Secure（https）
		true,    // HttpOnly
	)
	session := sessions.Default(c)
	session.Clear()
	hp.Success(c, gin.H{"message": "Logout success"})
}

// 需要验证
func (t *Cms)AdminList(c *gin.Context) {
    c.JSON(200, gin.H{"message": "AdminList placeholder"})
	hp.Success(c, gin.H{"adminList": []gin.H{
		{"id": 1, "name": "admin1"},
		{"id": 2, "name": "admin2"},
	}})
}

