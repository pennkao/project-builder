package md

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