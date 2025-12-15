package router

import (
	"net/http"
	"strings"

	"github.com/cms/admin"        // admin 包接口
	"github.com/cms/admin/middle" // AdminAuth 中间件
	"github.com/cms/api"          // 前端接口
	"github.com/cms/api/md"
	"github.com/cms/com/ws"
	"github.com/cms/cross"
	"github.com/gin-gonic/gin"
)


func SetupRouter(api *api.API, cms *admin.Cms) *gin.Engine {
	r := gin.Default()
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
	r.POST("/the-door/come-in", cms.Login)
	r.GET("/the-door/open", func(c *gin.Context) {
		c.File("./dist/login.html")
	})

	awss := r.Group("/wss")
	{
		awss.Use(md.Check()) // 仅保护 SPA 页面
		awss.GET("/chat", ws.Websocket)
	}

	// 3️⃣ 后台接口，需要验证
	adminUi := r.Group("/admin")
	adminUi.Use(middle.AdminAuth())   // ⭐ 关键：所有 /admin/** 统一鉴权
	{
		adminUi.GET("/*any", func(c *gin.Context) {
			c.File("./dist/index.html")
		})
	}
	adminApi := r.Group("/backend/api")
	adminApi.Use(middle.AdminAuth())   // ⭐ 关键：所有 /admin/api/** 统一鉴权
	{
		adminApi.POST("/*path", cms.Dispatch)
	}
	adminWs := r.Group("/backend/ws")
	// adminWs.Use(middle.AdminAuth())   // ⭐ 关键：所有 /admin/ws/** 统一鉴权
	{
		adminWs.GET("/chat", ws.Websocket)
	}

	// 4️⃣ 捕获所有未定义路由
	r.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path
		if strings.HasPrefix(path, "/api/") {
			c.String(http.StatusNotFound, "404 Not Found")
			c.Abort()
			return
		}
		c.String(http.StatusNotFound, "404 Not Found")
		c.Abort()

	})

	return r
}
