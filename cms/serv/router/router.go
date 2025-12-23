package router

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/cms/admin" // admin 包接口
	"github.com/cms/admin/define"
	"github.com/cms/admin/middle" // AdminAuth 中间件
	"github.com/cms/api"          // 前端接口
	"github.com/cms/api/md"
	"github.com/cms/com/ws"
	"github.com/cms/cross"
	"github.com/cms/utils"
	"github.com/gin-contrib/sessions/cookie"

	"github.com/gin-contrib/sessions"

	"github.com/gin-gonic/gin"
)


func SetupRouter(api *api.API, cms *admin.Cms) *gin.Engine {
	r := gin.Default()
	store := cookie.NewStore([]byte(define.SessionSecret))
	store.Options(sessions.Options{
		Path:     "/",
		MaxAge:   0 ,
		HttpOnly: true,
		Secure:   false, // 生产 true
		SameSite: http.SameSiteLaxMode,
	})

	r.Use(sessions.Sessions(define.SessionKey, store))
 	r.Use(cross.Cross())
	// 1️⃣ 静态资源 开放
	r.Static("/public",  "./public")

	r.Static("/assets",  "./dist/assets")
	r.Static("/images",  "./dist/images")
	r.Static("/plugins", "./dist/plugins")


	// 2️⃣ 前端接口，无需验证
	frontend := r.Group("/api")
	frontend.Use(md.Check())
	{
		frontend.GET("/chat", ws.Websocket)
		frontend.POST("/:path",api.Dispatch)
	}
	awss := r.Group("/wss")
	{
		awss.Use(md.Check()) // 仅保护 SPA 页面
		awss.GET("/chat", ws.Websocket)
	}
	// 2️⃣ 登录接口，无需验证
	login := r.Group("/the-door")
	login.Use(middle.LoginCheck())
	{
		login.POST("/come-in", cms.Login)
		login.GET("/open", func(c *gin.Context) {
			fmt.Println(c.Request.URL.Path)
			value := utils.SHA256(c.Request.Host + c.Request.URL.Path + define.LoginSecSalt)
			c.SetCookie(define.LoginSecKey, value, 60, "/the-door", c.Request.Host, false, true)
			c.File("./dist/login.html")
		})
	}

	// 3️⃣ 后台界面，需要验证
	adminUi := r.Group("/admin")
	adminUi.Use(middle.AdminAuth())   // ⭐ 关键：所有 /admin/** 统一鉴权
	{
		adminUi.GET("/*any", func(c *gin.Context) {
			c.File("./dist/index.html")
		})
	}

	// 3️⃣ 后台接口，需要验证
	backend := r.Group("/backend")
	backend.Use(middle.AdminAuth())
	{
	    backend.POST("/api/*path", cms.Dispatch)
		backend.GET("/ws/chat", ws.Websocket)
	}

	r.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path
		fmt.Println("sssssssssss",path)
		if strings.HasPrefix(path, "/admin") {
			// ⭐ 鉴权
			middle.AdminAuth()(c)
			if c.IsAborted() {
				return
			}

			// ⭐ SPA fallback
			c.File("./dist/index.html")
			return
		}

		// c.Status(http.StatusNotFound)
	})

	return r
}
