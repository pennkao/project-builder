// api/admin.go
package admin

import (
	"fmt"

	"github.com/cms/db"
	"github.com/cms/response"
	"github.com/gin-gonic/gin"
)

type Product struct {
     ID int `json:"id"`
     Name string `json:"name"`
     Category string `json:"category"`
     Brand string `json:"brand"`
     Price string `json:"price"`
     Stock string `json:"stock"`
     StockType string `json:"stockType"`
     Date string `json:"date"`
     Image string `json:"image"`
}

// 登录接口，不验证
// Products 函数处理产品相关的请求，返回产品列表
func (t *Cms)ListProducts(c *gin.Context) {
	products, err := t.DB.ListProducts(c.Request.Context(), db.ListProductsParams{
		Limit:  10,
		Offset: 0,
	})
	if err != nil {
		response.Error(c, 500, err.Error())
		return
	}
	fmt.Println("11111111111111")
     // 定义并初始化一个产品切片，包含多个产品信息
	response.Success(c, products);
}

func (t *Cms) AddProduct(c *gin.Context) {
	response.Success(c, Product{
		ID: 1,
		Name: "ASUS ROG Gaming Laptop",
	})
}