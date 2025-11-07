package router

import (
	"net/http"
	"path/filepath"
	"strings"

	"github.com/cms/admin"      // admin 包接口
	"github.com/cms/api"        // 前端接口
	"github.com/cms/middleware" // AdminAuth 中间件

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// 1️⃣ 静态资源目录（React build 输出）
	distDir := "./dist"
	r.Static("/assets", filepath.Join(distDir, "assets"))
	r.Static("/images", filepath.Join(distDir, "images"))
	r.StaticFile("/favicon.png", filepath.Join(distDir, "favicon.png"))

	// 2️⃣ 前端接口，无需验证
	frontend := r.Group("/api")
	{
		frontend.GET("/products", api.GetProducts)
		frontend.GET("/product/:id", api.GetProductDetail)
	}

	// 3️⃣ 后台管理接口
	backend := r.Group("/admin")
	{
		// 不需要验证的登录接口
		backend.POST("/login", admin.AdminLogin)

		// 需要验证的 SPA 路由
		protected := backend.Group("/")
		protected.Use(middleware.AdminAuth()) // 仅保护 SPA 页面
		protected.GET("/*path", func(c *gin.Context) {
			c.File(filepath.Join(distDir, "index.html"))
		})
	}

	// 4️⃣ 捕获所有未定义路由
	r.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path
		if strings.HasPrefix(path, "/api/") {
			c.JSON(http.StatusNotFound, gin.H{"error": "API not found"})
			return
		}
		c.String(http.StatusNotFound, "404 Not Found")
	})

	return r
}
