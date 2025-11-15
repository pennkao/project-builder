// api/admin.go
package admin

import (
	"fmt"
	"math/rand"

	"github.com/cms/com"
	"github.com/cms/db"
	"github.com/cms/dbtypes"
	"github.com/cms/dto/http/hp"
	"github.com/cms/dto/http/hq"
	"github.com/cms/utils"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

// 登录接口，不验证
// Products 函数处理产品相关的请求，返回产品列表
func (t *Cms)ListProducts(c *gin.Context) {
	// 从查询参数中获取当前页码和每页显示数量，默认为1和10	
	var params db.ListProductsParams

	page := com.NewPage(c)
	params.Limit = page.GetLimit()
	params.Offset = page.GetOffset() // 偏移量

	products, err := t.Q.ListProducts(c.Request.Context(), params)
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	total, err := t.Q.GetProductCount(c.Request.Context())
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	page.SetTotal(int(total)) // 设置总记录数
	page.SetList(products) // 设置产品列表
     // 定义并初始化一个产品切片，包含多个产品信息
	hp.Success[any](c, page)
}



func (t *Cms) CheckProductHandle(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req hq.ProductHandleReq
    if err := hq.Json(c, &req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    count, err := t.Q.GetProductHandleCheck(c.Request.Context(), req.Handle)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, count) // 返回产品数量
}

func (t *Cms) GetProductHandleCount(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req hq.ProductHandleReq
    if err := hq.Json(c, &req); err != nil {
        hp.Error[any](c, err.Error())
        return
    }
    count, err := t.Q.GetProductHandleCount(c.Request.Context(), pgtype.Text{String: req.Handle, Valid: true})
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, count) // 返回产品数量
}

func (t *Cms) CreateProductMain(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.CreateProductMainParams
    if err := hq.Json(c, &req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

    id := int64(utils.Fnv1a32(req.Handle))
	if (req.ID != id) {
		hp.Error[any](c,  fmt.Sprintf("ID mismatch %d != %d", req.ID, id))
		return
	}

	if (req.Stock == 0) {
		req.Stock = int32(99999)  ////////todo
	}

	req.SalesCount = int32(10 + rand.Intn(2000-10+1)) // 随机生成一个10到2000之间的整数

    id, err := t.Q.CreateProductMain(c.Request.Context(), req)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, id) // 返回产品数量
}

func (t *Cms) CreateProductOptions(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.CreateProductOptionsParams
    if err := hq.Json(c, &req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

    err := t.Q.CreateProductOptions(c.Request.Context(), req)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, nil) // 返回产品数量
}

func (t *Cms) CreateProductSkus(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req hq.ProductHandleResp
    if err := hq.Json(c, &req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
	tx, err := t.Db.Begin(c.Request.Context()) // database/sql 风格
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	defer func() {
		if err != nil {
			tx.Rollback(c.Request.Context())
		}
	}()


	if len(req.Skus) == 0 {
		var product, err = t.Q.GetProduct(c.Request.Context(), req.ProductID)
		if err != nil {
			hp.Error[any](c,  err.Error())
			return
		}
		req.Skus = append(req.Skus, db.CreateProductSkuParams{
			ProductID: req.ProductID,
			Name:      "PRODUCT",
			Image:     product.MainImage,
			WeightG:   product.WeightG,
			Price:     product.Price,
			Stock:     product.Stock,
			Attrs:     dbtypes.JSON([]byte("{}")), // TODO
		})
	}

	for _, sku := range req.Skus {
		sku.ProductID = req.ProductID
	     err = t.Q.CreateProductSku(c.Request.Context(), sku)
		 if err != nil {
			hp.Error[any](c,  err.Error())
			return
		 }
	}
	err = t.Q.UpdateProductMainSkuNum(c.Request.Context(), db.UpdateProductMainSkuNumParams{
			ID:        req.ProductID,
			SkuNum:    int16(len(req.Skus)),
	})
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	// 关键：手动提交
	err = tx.Commit(c.Request.Context())
	if err != nil {
		hp.Error[any](c, "事务提交失败: "+err.Error())
		return
	}
    hp.Success[any](c, nil) // 返回产品数量
}

func (t *Cms) CreateProductContent(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.CreateProductContentParams
    if err := hq.Json(c, &req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    err := t.Q.CreateProductContent(c.Request.Context(), req)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, nil) // 返回产品数量
}

func (t *Cms) CreateProductDetails(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.CreateProductDetailsParams
    if err := hq.Json(c, &req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
	tx, err := t.Db.Begin(c.Request.Context()) // database/sql 风格
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}

	defer func() {
		if err != nil {
			tx.Rollback(c.Request.Context())
		}
	}()


    err = t.Q.CreateProductDetails(c.Request.Context(), req)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
	if len(req.Images) > 0 {
		err = t.Q.UpdateProductMainImage(c.Request.Context(), db.UpdateProductMainImageParams{
			ID:           req.ProductID,
			MainImage:    req.Images[0],
		})
		if err != nil {
			hp.Error[any](c,  err.Error())
			return
		}
	}
	// 关键：手动提交
	err = tx.Commit(c.Request.Context())
	if err != nil {
		hp.Error[any](c, "事务提交失败: "+err.Error())
		return
	}
    hp.Success[any](c, nil) // 返回产品数量
}

func (t *Cms) CreateProductSkuJson(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.CreateProductSkuJsonParams
    if err := hq.Json(c, &req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    err := t.Q.CreateProductSkuJson(c.Request.Context(), req)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, nil) // 返回产品数量
}


