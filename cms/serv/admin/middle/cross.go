package middle

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Cross() gin.HandlerFunc {
	 return cors.New(cors.Config{
        // 允许的源（必须具体列出，不能用 *，因为用了 credentials）
        AllowOrigins: []string{
			"http://localhost:5174", 
            "http://localhost:3000",     // React 默认端口
            "http://127.0.0.1:3000",
            "http://127.0.0.1:5174",
            "http://localhost:5173",     // Vite 默认端口
            "https://yourdomain.com",    // 生产环境域名
        },

        // 允许的方法
        AllowMethods: []string{
            "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS",
        },

        // 允许的请求头
        AllowHeaders: []string{
            "Origin",
            "Content-Type",
            "Accept",
            "Authorization",
            "X-Requested-With",
			"X-Requested-Time",
        },

        // 是否允许携带凭证（cookies、authorization headers 等）
        AllowCredentials: true, // 👈 必须为 true，因为前端用了 credentials: 'include'
        // 预检请求缓存时间（可选）
        MaxAge: 12 * time.Hour,
	
    })
}