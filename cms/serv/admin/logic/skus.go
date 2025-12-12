package logic

import (
	"errors"
	"fmt"
	"time"

	"github.com/cms/admin/dto/hq"
	"github.com/cms/db"
	"github.com/cms/dbtypes"
	"github.com/cms/utils"
	"github.com/jackc/pgx/v5/pgtype"
)

const (
	Uksalt = "YTUVI3w8V1"
	DefaultSkuName = "Default Title"
	DefaultSkuAttrKey = "default"
)

// 处理 SKU：新增/删除/更新
func ProcessUpdateSkus(product db.Product, submitSkus []hq.SkuItemReq, dbSkus []db.ProductSku) (toCreate []db.BatchCreateProductSkusParams, toUpdate []db.BatchUpdateProductSkusParams, toDelete []int64, err error) {
	// 创建辅助 map，方便对比
	dbMap := make(map[string]db.ProductSku)
	for _, sku := range dbSkus {
		dbMap[sku.Ukey] = sku
	}

	submitMap := make(map[string]hq.SkuItemReq)
	for _, sku := range submitSkus {
		
		//无ukey  新增的
		if sku.Ukey == "" {
			toCreate = append(toCreate, db.BatchCreateProductSkusParams{
				ProductID: product.ID,
				Title      : sku.Title,
				Code      : sku.Code,
				Image     : sku.Image,
				WeightG   : sku.WeightG,
				Status    : sku.Status,
				Stock: sku.Stock,
				Price: sku.Price,
				Ukey:   ukeyMd5(product.ID, sku.Akey),
				Akey:    sku.Akey,
				Attrs      : sku.Attrs,
				Stored:     1,
			})
			continue
		}

		if sku.Ukey != ukeyMd5(product.ID, sku.Akey) {
			return nil, nil, nil, fmt.Errorf("sku ukey %s not match akey %s", sku.Ukey, ukeyMd5(product.ID, sku.Akey ))
		}
		submitMap[sku.Ukey] = sku
	}

	// Step 1: 找出要删除的 SKU（数据库有，提交中没有）
	for _, sku := range dbSkus {
		if _, ok := submitMap[sku.Ukey]; !ok {
			toDelete = append(toDelete, sku.ID)
		}
	}

	// Step 2: 找出要更新的 SKU（数据库有，提交也有）
	for _, sku := range submitSkus {
		//新增 id=0或者不在db中

		if dbSku, ok := dbMap[sku.Ukey]; ok {
			var uts pgtype.Int8
			now := time.Now().UnixMilli() // int64
			err := uts.Scan(now)
			if err != nil {
				return nil, nil, nil, fmt.Errorf("pgtype.Int8.Scan error: %v", sku.Ukey)
			}
			if dbSku.ID != sku.ID {
				return nil, nil, nil, fmt.Errorf("sku ukey %s not match id %d", sku.Ukey, sku.ID)
			}
			toUpdate = append(toUpdate, db.BatchUpdateProductSkusParams{
				ProductID: product.ID,
				ID: sku.ID,
				Code      : sku.Code,
				Title      : sku.Title,
				Image     : sku.Image,
				WeightG   : sku.WeightG,
				Status    : sku.Status,
				Uts: uts,
				Stock: sku.Stock,
				Price: sku.Price,
			})
		}
		
	}
	return
}

func ProcessCreateSkus( product db.Product,reqSkuList []hq.SkuItemReq) (toCreate []db.BatchCreateProductSkusParams, err error){

	if len(reqSkuList) == 0 {
		toCreate = append(toCreate, db.BatchCreateProductSkusParams{
			ProductID: product.ID,
			Title      : DefaultSkuName, //sku.Name,	
			Code      : "",
			Image     : product.MainImage,
			Price     : product.Price,
			WeightG   : product.WeightG,
			Status    : product.Status,
			Attrs      : dbtypes.JSON([]byte("{}")), // TODO,
			Stock       :    0,
			Stored         :     1,
			Ukey:    ukeyMd5(product.ID, DefaultSkuAttrKey),
			Akey:    DefaultSkuAttrKey,
		})
	}

	for _, sku := range reqSkuList {
		if sku.Title == "" {
			return nil, errors.New("sku title is empty")
		}
		toCreate = append(toCreate, db.BatchCreateProductSkusParams{
			ProductID: product.ID,
			Title      : sku.Title,
			Code      : sku.Code,
			Image     : sku.Image,
			Price     : sku.Price,
			WeightG   : sku.WeightG,
			Status    : 0,
			Attrs      : sku.Attrs,
			Stock       :     sku.Stock,
			Stored         :     1,
			Ukey:    ukeyMd5(product.ID, sku.Akey),
			Akey:    sku.Akey,
		})
	}

	return toCreate, nil
}

func ukeyMd5(productID int64, Akey string) string {
	return utils.Md5Salt(fmt.Sprintf("%d-%s", productID, Akey) , Uksalt)
}