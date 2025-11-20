package api

import (
	"strconv"

	"github.com/cms/api/dto/resp"
	"github.com/cms/db"
	"github.com/cms/utils"
	"github.com/gin-gonic/gin"
)

func (t *API) GetProductList(c *gin.Context) {
	// 从查询参数中获取产品 handle
	productList, err := t.Q.FetchProductList(c, db.FetchProductListParams{
		Limit:  10,
		Offset: 0,
	})
	if err != nil {
		resp.Success[any](c, nil)
		return
	}
	resp.Success(c, productList)
}

func (t *API) GetProductByHandle(c *gin.Context) {
	handle := c.Param("id")
	id := utils.Fnv1a32(handle)
	// 从查询参数中获取产品 handle
	product, err := t.Q.FetchProductById(c, int64(id))
	if err != nil {
		resp.Success[any](c, nil)
		return
	}
	resp.Success(c, product)
}

func (t *API) GetProductDetails(c *gin.Context){
	id := c.Param("id")
	id64,_:=strconv.ParseInt(id, 10, 64)
	details, err:= t.Q.FetchProductDetail(c, id64)
	if err != nil {
		resp.Success[any](c, nil)
		return
	}
	resp.Success(c, details)
}

func (t *API) GetProductOptions(c *gin.Context){
	id := c.Param("id")
	id64,_:=strconv.ParseInt(id, 10, 64)
	details, err:= t.Q.FetchProductOptions(c, id64)
	if err != nil {
		resp.Success[any](c, nil)
		return
	}
	resp.Success(c, details)
}

func (t *API)GetProductSkus(c *gin.Context){
		id := c.Param("id")
	id64,_:=strconv.ParseInt(id, 10, 64)
	data, err:= t.Q.FetchProductSkus(c, id64)
	if err != nil {
		resp.Success[any](c, nil)
		return
	}
	resp.Success(c, data)
}