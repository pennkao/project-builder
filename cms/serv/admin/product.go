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

func (t *Cms) CreateProductMain(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.CreateProductMainParams
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

    id := int64(utils.Fnv1a32(req.Handle))
	if (req.ID != id) {
		hp.Error[any](c,  fmt.Sprintf("ID mismatch %d != %d", req.ID, id))
		return
	}

	if (req.Price == 0) {
		n := 3 + rand.Intn(1000-2)
		req.Price = int64(n+5) * 100
		if (req.Points == 0) {
			req.Points = int32(n * 10)
		}
	} else {
		if (req.Points == 0) {
			n := 0 + rand.Intn(int(req.Price-100)/100)
			req.Points = int32(n * 10)
		}
	}

	if (req.Stock == 0) {
		req.Stock = int32(3 + rand.Intn(19))
	}
	if (req.SalesCount == 0) {
		req.SalesCount = int32(13 + rand.Intn(2000))
	}
	if (req.WeightG == 0) {
		req.WeightG = 1
	}

    id, err := t.Q.CreateProductMain(c.Request.Context(), req)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, id) // 返回产品数量
}

func (t *Cms) UpdateProductMain(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.UpdateProductMainParams
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
	if (req.Stock == 0) {
		req.Stock = int32(99999)  ////////todo
	}

	req.SalesCount = int32(10 + rand.Intn(2000-10+1)) // 随机生成一个10到2000之间的整数

    err := t.Q.UpdateProductMain(c.Request.Context(), req)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, req.ID) // 返回产品数量
}

func (t *Cms) CreateProductOptions(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.CreateProductOptionsParams
    if err := c.ShouldBindJSON(&req); err != nil {
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

func (t *Cms) UpdateProductOptions(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.UpdateProductOptionsParams
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    err := t.Q.UpdateProductOptions(c.Request.Context(), req)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, nil) // 返回产品数量
}



func (t *Cms) CreateProductSkus(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req hq.ProductSkusReq
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

	product,err:= t.Q.GetProduct(c.Request.Context(), req.ProductID)
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}

	toCreate, err := logic.ProcessCreateSkus(product, req.Skus)
	if err != nil {
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


	t.Q.BatchCreateProductSkus(c.Request.Context(), toCreate).Exec(func(i int, err error) {
		if err != nil {
			hp.Error[any](c,  err.Error())
			return
		}
	})

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



func (t *Cms) UpdateProductSkus(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req hq.ProductSkusReq
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }

	product,err:= t.Q.GetProduct(c.Request.Context(), req.ProductID)
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	if len(req.Skus) == 0 {
		hp.Error[any](c,  "empty skus")
		return
	}
	dbSkus,err:=t.Q.GetProductSkus(c.Request.Context(), req.ProductID)
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	toCreate,toUpdate,toDelete,err := logic.ProcessUpdateSkus(product,req.Skus, dbSkus)
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}
	skuNum := len(dbSkus) - len(toDelete) + len(toCreate)
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
	
	//删除
	err = t.Q.DeleteProductSku(c.Request.Context(), db.DeleteProductSkuParams{
		ProductID: req.ProductID,
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

	err = t.Q.UpdateProductSkuStored(c.Request.Context(), req.ProductID)
	if err != nil {
		hp.Error[any](c,  err.Error())
		return
	}

	err = t.Q.UpdateProductMainSkuNum(c.Request.Context(), db.UpdateProductMainSkuNumParams{
			ID:        req.ProductID,
			SkuNum:    int16(skuNum),
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

func (t *Cms) CreateProductContent(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.CreateProductContentParams
    if err := c.ShouldBindJSON(&req); err != nil {
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

func (t *Cms) UpdateProductContent(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.UpdateProductContentParams
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
	_,err:= t.Q.GetProductContent(c.Request.Context(), req.ProductID)
	if err != nil {
		err=t.Q.CreateProductContent(c.Request.Context(), db.CreateProductContentParams(req))
		if err != nil {
			hp.Error[any](c,  err.Error())
			return
		}
	}	
    err = t.Q.UpdateProductContent(c.Request.Context(), req)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, nil) // 返回产品数量
}

func (t *Cms) CreateProductDetails(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.CreateProductDetailsParams
    if err := c.ShouldBindJSON(&req); err != nil {
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

func (t *Cms) UpdateProductDetails(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.UpdateProductDetailsParams
    if err := c.ShouldBindJSON(&req); err != nil {
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


    err = t.Q.UpdateProductDetails(c.Request.Context(), req)
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
    if err := c.ShouldBindJSON(&req); err != nil {
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

func (t *Cms) UpdateProductSkuJson(c *gin.Context) {
    // 从查询参数中获取产品 handle
    var req db.UpdateProductSkuJsonParams
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    err := t.Q.UpdateProductSkuJson(c.Request.Context(), req)
    if err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
    hp.Success[any](c, nil) // 返回产品数量
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
