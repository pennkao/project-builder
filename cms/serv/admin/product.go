// api/admin.go
package admin

import (
	"github.com/cms/com"
	"github.com/cms/db"
	"github.com/cms/dto/http/rep"
	"github.com/gin-gonic/gin"
)

// 登录接口，不验证
// Products 函数处理产品相关的请求，返回产品列表
func (t *Cms)ListProducts(c *gin.Context) {
	// 从查询参数中获取当前页码和每页显示数量，默认为1和10	
	var params db.ListProductsParams

	page := com.NewPage(c)
	params.Limit = page.GetLimit()
	params.Offset = page.GetOffset() // 偏移量

	products, err := t.DB.ListProducts(c.Request.Context(), params)
	if err != nil {
		rep.Error[any](c, 500, err.Error())
		return
	}
	total, err := t.DB.GetProductCount(c.Request.Context())
	if err != nil {
		rep.Error[any](c, 500, err.Error())
		return
	}
	page.SetTotal(int(total)) // 设置总记录数
	page.SetList(products) // 设置产品列表
     // 定义并初始化一个产品切片，包含多个产品信息
	rep.Success[any](c, page)
}

func (t *Cms) AddProduct(c *gin.Context) {
	rep.Success[any](c, 1)
}