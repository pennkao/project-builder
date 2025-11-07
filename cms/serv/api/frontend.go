// api/frontend.go
package api

import "github.com/gin-gonic/gin"

func GetProducts(c *gin.Context) {
    // TODO: 前端获取商品列表逻辑
    c.JSON(200, gin.H{"message": "GetProducts placeholder"})
}

func GetProductDetail(c *gin.Context) {
    c.JSON(200, gin.H{"message": "GetProductDetail placeholder"})
}
