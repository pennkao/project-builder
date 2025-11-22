package hq

import (
	"github.com/cms/dbtypes"
	"github.com/jackc/pgx/v5/pgtype"
)

type FetcherReq struct {
	Id     int64  `json:"id" binding:"required"`
	Target string `json:"target" binding:"required"`
}

type FetchersReq struct {
	Ids    []int64 `json:"ids" binding:"required"` // 数组也必须存在且非 nil
	Target string  `json:"target" binding:"required"`
}

type DeleterReq struct {
	Id     int64  `json:"id" binding:"required"`
	Target string `json:"target" binding:"required"`
}

type DeletersReq struct {
	Ids    []int64 `json:"ids" binding:"required"` // 数组必须存在且非 nil
	Target string  `json:"target" binding:"required"`
}

type UpdaterReq struct {
	Id     int64  `json:"id" binding:"required"`
	Target string `json:"target" binding:"required"`
	Dtype string  `json:"dtype" binding:"required"`
	Value string  `json:"value" binding:"required"`
}

type UpdatersReq struct {
	Ids    []int64 `json:"ids" binding:"required"` // 数组必须存在且非 nil
	Target string  `json:"target" binding:"required"`
	Dtype string  `json:"dtype" binding:"required"`
	Value string  `json:"value" binding:"required"`
}
// ==================
type ProductHandleReq struct {
	Handle string `json:"handle" binding:"required"`
}

// =============list=================
type SortItem struct {
	Field string `json:"field"`
	Order string `json:"order"` // asc / desc
}

type FilterItem struct {
	Field    string      `json:"field"`
	Operator string      `json:"operator"` // =, >, <, like, in, between, etc
	Value    interface{} `json:"value"`
}

type ListerParamsReq struct {
	Target string       `json:"target" binding:"required"`
	Sort   []SortItem   `json:"sort,omitempty"`
	Filter []FilterItem `json:"filter,omitempty"`
}

type ProductSkusReq struct {
	ProductID int64          `json:"product_id" binding:"required"`
	Skus      []SkuItemReq `json:"skus"`
}

type SkuItemReq struct {
	ID        int64          `json:"id"`
	ProductID int64          `json:"product_id"`
	Name      string         `json:"name"`
	Akey      string         `json:"akey"`
	Ukey      string         `json:"ukey"`
	Code      string         `json:"code"`
	Image     string         `json:"image"`
	Price     pgtype.Numeric `json:"price"`
	Stock     int32          `json:"stock"`
	WeightG   int32          `json:"weight_g"`
	Attrs     dbtypes.JSON   `json:"attrs"`
	Status    int16          `json:"status"`
	Stored    int16          `json:"stored"`
}

type ImagesReq struct {
	Images      []string `json:"images"`
}