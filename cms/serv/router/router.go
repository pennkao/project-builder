package router

import (
	"net/http"
	"strings"

	"github.com/cms/admin"        // admin 包接口
	"github.com/cms/admin/middle" // AdminAuth 中间件
	"github.com/cms/api"          // 前端接口
	"github.com/cms/api/md"
	"github.com/cms/cross" // 前端接口中间件
	"github.com/cms/ws"

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
	// 3️⃣ 后台管理接口
	backend := r.Group("/admin")
	{
		protected := backend.Group("/")
		protected.Use(middle.AdminAuth()) // 仅保护 SPA 页面
		protected.POST("/api/*path", cms.Dispatch)
		protected.GET("/*path", func(c *gin.Context) {
			c.File("./dist/index.html")
		})
	}

	wss := r.Group("/ws")
	{
		wss.Use(middle.AdminAuth(),) // 仅保护 SPA 页面
		wss.GET("/chat", ws.Websocket)
	}
	awss := r.Group("/wss")
	{
		awss.Use(middle.AdminAuth(),) // 仅保护 SPA 页面
		awss.GET("/chat", ws.Websocket)
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
