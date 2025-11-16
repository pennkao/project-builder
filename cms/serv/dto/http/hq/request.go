package hq

import "github.com/cms/db"

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

// ==================
type ProductHandleReq struct {
	Handle string `json:"handle" binding:"required"`
}

type ProductHandleResp struct {
	ProductID int64                       `json:"product_id" binding:"required"`
	Skus      []db.CreateProductSkuParams `json:"skus" binding:"required"`
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

type ListParamsReq struct {
	Target string       `json:"target" binding:"required"`
	Sort   []SortItem   `json:"sort,omitempty"`
	Filter []FilterItem `json:"filter,omitempty"`
}
