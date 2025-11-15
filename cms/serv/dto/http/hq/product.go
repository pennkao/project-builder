package hq

import (
	"github.com/cms/db"
)
type ProductHandleReq struct {
	Handle string `json:"handle"`
}

type ProductHandleResp struct {
	ProductID int64 `json:"product_id"`
    Skus []db.CreateProductSkuParams `json:"skus"`
}


