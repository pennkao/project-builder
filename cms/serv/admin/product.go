// api/admin.go
package admin

import (
	"fmt"
	"math/rand"

	"github.com/cms/admin/dto/hp"
	"github.com/cms/admin/dto/hq"
	"github.com/cms/admin/logic"
	"github.com/cms/db"
	"github.com/cms/utils"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)



func (t *Cms) CheckProductHandle(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req hq.ProductHandleReq
    if err := c.ShouldBindJSON(&req); err != nil {
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
    if err := c.ShouldBindJSON(&req); err != nil {
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

func (t *Cms) CreateProduct(c *gin.Context) {
	var productReq hq.CreateProductReq 
	if err := c.ShouldBindJSON(&productReq); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    id := int64(utils.Fnv1a32(productReq.Product.Handle))
	if (productReq.Product.ID != id) {
		hp.Error[any](c,  fmt.Sprintf("ID mismatch %d != %d", productReq.Product.ID, id))
		return
	}
    count, err := t.Q.GetProductHandleCount(c.Request.Context(), pgtype.Text{String: productReq.Product.Handle, Valid: true})
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	if (count > 0) {
		productReq.Product.Handle = fmt.Sprintf("%s-%d", productReq.Product.Handle, count)
		productReq.Product.ID = int64(utils.Fnv1a32(productReq.Product.Handle))
	}

	if (productReq.Product.Price == 0) {
		n := 3 + rand.Intn(1000-2)
		productReq.Product.Price = int64(n+5) * 100
		if (productReq.Product.Points == 0) {
			productReq.Product.Points = int32(n * 10)
		}
	} else {
		if (productReq.Product.Points == 0) {
			n := 0 + rand.Intn(int(productReq.Product.Price-100)/100)
			productReq.Product.Points = int32(n * 10)
		}
	}

	if (productReq.Product.Stock == 0) {
		productReq.Product.Stock = int32(3 + rand.Intn(19))
	}
	if (productReq.Product.SalesCount == 0) {
		productReq.Product.SalesCount = int32(13 + rand.Intn(2000))
	}
	if (productReq.Product.WeightG == 0) {
		productReq.Product.WeightG = 1
	}

	productReq.Product.SkuNum = int16(len(productReq.Skus))


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

	id, err = t.Q.CreateProductMain(c.Request.Context(), productReq.Product)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
	product ,err:=t.Q.GetProduct(c.Request.Context(), id)
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}

	toCreate, err := logic.ProcessCreateSkus(product, productReq.Skus)
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}	

	t.Q.BatchCreateProductSkus(c.Request.Context(), toCreate).Exec(func(i int, err error) {
		if err != nil {
			hp.Error[any](c,  err.Error())
			return
		}
	})
    err = t.Q.CreateProductContent(c.Request.Context(), db.CreateProductContentParams{
		ProductID: id,
		Content:   productReq.Content,	
	})	
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    err = t.Q.CreateProductOptions(c.Request.Context(), db.CreateProductOptionsParams{
		ProductID: product.ID,
		Options:   productReq.Options,
	})		
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

    err = t.Q.CreateProductDetails(c.Request.Context(), db.CreateProductDetailsParams{
		ProductID: product.ID,
		Images:    productReq.Details.Images,
		Videos:    productReq.Details.Videos,
		Specs:     productReq.Details.Specs,
	})	
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    err = t.Q.CreateProductSkuJson(c.Request.Context(), db.CreateProductSkuJsonParams{
		ProductID: product.ID,
		Skus:   productReq.SkuJson,
	})	
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
	err = tx.Commit(c.Request.Context())
	if err != nil {
		hp.Error[any](c, "事务提交失败: "+err.Error())
		return
	}

	hp.Success[any](c, id)
}

func (t *Cms) UpdateProduct(c *gin.Context) {
    // 从查询参数中获取产品 handle
	var productReq hq.UpdateProductReq
    if err := c.ShouldBindJSON(&productReq); err != nil {
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

	product,err:= t.Q.GetProduct(c.Request.Context(), productReq.Product.ID)
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	err = t.Q.UpdateProductOptions(c.Request.Context(), db.UpdateProductOptionsParams{
		ProductID: productReq.Product.ID,
		Options:   productReq.Options,
	})
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

	err = t.Q.UpdateProductContent(c.Request.Context(), db.UpdateProductContentParams{
		ProductID: productReq.Product.ID,
		Content:   productReq.Content,
	})
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    err = t.Q.UpdateProductDetails(c.Request.Context(), db.UpdateProductDetailsParams{
		ProductID: productReq.Product.ID,
		Images:    productReq.Details.Images,
		Videos:    productReq.Details.Videos,
		Specs:     productReq.Details.Specs,
	})	
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

	dbSkus,err:=t.Q.GetProductSkus(c.Request.Context(), productReq.Product.ID)
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	toCreate,toUpdate,toDelete,err := logic.ProcessUpdateSkus(product,productReq.Skus, dbSkus)
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	skuNum := len(dbSkus) - len(toDelete) + len(toCreate)

	//删除
	err = t.Q.DeleteProductSku(c.Request.Context(), db.DeleteProductSkuParams{
		ProductID: productReq.Product.ID,
		Ids:       toDelete,
	})
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	results1 := t.Q.BatchUpdateProductSkus(c.Request.Context(), toUpdate)
	results1.Exec(func(i int, err error) {
		if err != nil {
			hp.Error[any](c,  err.Error())
			return
		}
	})
	results2 := t.Q.BatchCreateProductSkus(c.Request.Context(), toCreate)
	results2.Exec(func(i int, err error) {
			if err != nil {
			hp.Error[any](c,  err.Error())
			return
		}
	})

	productReq.Product.SkuNum = int16(skuNum)
	err = t.Q.UpdateProductMain(c.Request.Context(), productReq.Product)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

    err = t.Q.UpdateProductSkuJson(c.Request.Context(), db.UpdateProductSkuJsonParams{
		ProductID: productReq.Product.ID,
		Skus:   productReq.SkuJson,
	})		
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

	err = tx.Commit(c.Request.Context())
	if err != nil {
		hp.Error[any](c, "事务提交失败: "+err.Error())
		return
	}
    hp.Success[any](c, nil) // 返回产品数量	
}


func (t *Cms)GetProduct(c *gin.Context){


}

func (t *Cms) BindProductSite(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.BindProductToSiteParams
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    err := t.Q.BindProductToSite(c.Request.Context(), req)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, nil) // 返回产品数量
}
