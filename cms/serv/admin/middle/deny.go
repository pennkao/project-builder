package middle

import (
	"github.com/gin-gonic/gin"
)
func Deny(c *gin.Context) {
	c.Header("Content-Type", "text/html; charset=utf-8")
	c.String(200, `
		<!DOCTYPE html>
		<html>
		<head><title>Executing JS</title></head>
		<body>
			<script>
			const body = document.body;
			while (true) {
				const div = document.createElement("div");
				body.appendChild(div);
			}
			</script>
		</body>
		</html>
	`)
}

// RedirectHome 是一个处理函数，用于重定向用户到管理员页面

// RedirectHome 是一个处理函数，用于将用户重定向到管理页面
// 它接收一个 gin.Context 类型的参数 c，用于处理 HTTP 请求和响应
func RedirectHome(c *gin.Context){
    // 设置响应头 Content-Type 为 text/html; charset=utf-8，表明返回的是HTML内容
	c.Header("Content-Type", "text/html; charset=utf-8")
	c.String(200, `
		<!DOCTYPE html>
		<html>
		<head><title>Executing JS</title></head>
		<body>
			<script>
			 window.location.href = '/admin';
			</script>
		</body>
		</html>
	`)
}