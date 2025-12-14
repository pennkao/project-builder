package hq

import (
	// "github.com/cms/admin/dto/hq"
	"github.com/cms/dbtypes"
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
	Ids     []int64  `json:"ids" binding:"required"`
	Target string `json:"target" binding:"required"`
}

type UpdaterReq struct {
	Id     int64  `json:"id" binding:"required"`
	Target string `json:"target" binding:"required"`
	Dtype string  `json:"dtype" binding:"required"`
	Value interface{}  `json:"value" binding:"required"`
}

type UpdatersReq struct {
	Ids    []int64 `json:"ids" binding:"required"` // 数组必须存在且非 nil
	Target string  `json:"target" binding:"required"`
	Dtype string  `json:"dtype" binding:"required"`
	Value interface{}  `json:"value" binding:"required"`
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

type ImagesReq struct {
	Images      []string `json:"images"`
}

type SkuItemReq struct {
	ID        int64          `json:"id"`
	ProductID int64          `json:"product_id"`
	Title     string         `json:"title"`
	Akey      string         `json:"akey"`
	Ukey      string         `json:"ukey"`
	Code      string         `json:"code"`
	Image     string         `json:"image"`
	Price     int64          `json:"price"`
	Stock     int32          `json:"stock"`
	WeightG   int32          `json:"weight_g"`
	Attrs     dbtypes.JSON   `json:"attrs"`
	Status    int16          `json:"status"`
	Stored    int16          `json:"stored"`
}

type CreateProductReq struct {
	Product struct {
		ID          int64    `json:"id"`
		Title       string   `json:"title"`
		Subtitle    string   `json:"subtitle"`
		Handle      string   `json:"handle"`
		Tags        []string `json:"tags"`
		WeightG     int32    `json:"weight_g"`
		Brand       string   `json:"brand"`
		Category    string   `json:"category"`
		MainImage   string   `json:"main_image"`
		Description string   `json:"description"`
		Price       int64    `json:"price"`
		SkuNum      int16    `json:"sku_num"`
		SalesCount  int32    `json:"sales_count"`
		Stock       int32    `json:"stock"`
		Points      int32    `json:"points"`
	} `json:"product"`	
	Details struct {
		Images    []string     `json:"images"`
		Videos    []string     `json:"videos"`
		Specs     dbtypes.JSON `json:"specs"`
	} `json:"details"`	
	Skus []SkuItemReq `json:"skus"`
	SkuJson dbtypes.JSON `json:"sku_json"`
	Options dbtypes.JSON `json:"options"`
	Content string `json:"content"`
}

type UpdateProductReq struct {
	Product struct {
		ID          int64    `json:"id"`
		Title       string   `json:"title"`
		Tags        []string `json:"tags"`
		Status      int16    `json:"status"`
		Deleted     int16    `json:"deleted"`
		SkuNum      int16    `json:"sku_num"`
		WeightG     int32    `json:"weight_g"`
		Brand       string   `json:"brand"`
		Category    string   `json:"category"`
		MainImage   string   `json:"main_image"`
		SalesCount  int32    `json:"sales_count"`
		Stock       int32    `json:"stock"`
		Price       int64    `json:"price"`
		Points      int32    `json:"points"`
		Subtitle    string   `json:"subtitle"`
		Description string   `json:"description"`
	} `json:"product"`	
	Details struct {
		Images    []string     `json:"images"`
		Videos    []string     `json:"videos"`
		Specs     dbtypes.JSON `json:"specs"`
	} `json:"details"`	
	Skus []SkuItemReq `json:"skus"`
	SkuJson dbtypes.JSON `json:"sku_json"`
	Options dbtypes.JSON `json:"options"`
	Content string `json:"content"`
}