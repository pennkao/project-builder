package router

import (
	"net/http"
	"strings"

	"github.com/cms/admin"        // admin 包接口
	"github.com/cms/admin/middle" // AdminAuth 中间件
	"github.com/cms/api"          // 前端接口

	"github.com/gin-gonic/gin"
)


func SetupRouter(api *api.API, cms *admin.Cms) *gin.Engine {
	r := gin.Default()
	middle.Cross(r)
		
	// 1️⃣ 静态资源
	r.Static("/public",  "./public")
	r.Static("/assets",  "./dist/assets")
	r.Static("/images",  "./dist/images")
	r.StaticFile("/favicon.png", "./dist/favicon.png")

	// 2️⃣ 前端接口，无需验证
	frontend := r.Group("/api")
	{
		frontend.POST("/:path",api.DispatchList)
		frontend.POST("/:path/:id",api.Dispatcher)
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
		protected.POST("/api/*path", cms.Dispatcher)
		protected.GET("/*path", func(c *gin.Context) {
			c.File("./dist/index.html")
		})
	}

	// 4️⃣ 捕获所有未定义路由
	r.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path
		if strings.HasPrefix(path, "/api/") {
			c.String(http.StatusNotFound, "404 Not Found")
			c.Abort()
		}
		c.String(http.StatusNotFound, "404 Not Found")
		c.Abort()

	})

	return r
}
