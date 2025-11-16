package db

import (
	"context"
)

var a = batchCreateProductSku


func (q *Queries) QueryImageCount(ctx context.Context,where string, args []interface{}) (int64, error) {
	row := q.db.QueryRow(ctx, baseImageCountSql+ where, args...)
	var count int64
	err := row.Scan(&count)
	return count, err
}

func (q *Queries) QueryProductCount(ctx context.Context, where string, args []interface{}) (int64, error) {
	row := q.db.QueryRow(ctx, baseProductCountSql + where, args...)
	var count int64
	err := row.Scan(&count)
	return count, err
}

func (q *Queries) QueryProductList(ctx context.Context, where string, args []interface{}) ([]Product, error) {
	rows, err := q.db.Query(ctx, baseProductListSql + where, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Product
	for rows.Next() {
		var i Product
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Handle,
			&i.Tags,
			&i.Status,
			&i.Deleted,
			&i.SkuNum,
			&i.WeightG,
			&i.Brand,
			&i.Category,
			&i.MainImage,
			&i.SalesCount,
			&i.Stock,
			&i.Price,
			&i.Cts,
			&i.Uts,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

func (q *Queries) QueryImageList(ctx context.Context, where string, args []interface{}) ([]Image, error) {
	rows, err := q.db.Query(ctx, baseImageListSql + where, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Image
	for rows.Next() {
		var i Image
		if err := rows.Scan(
			&i.ID,
			&i.Url,
			&i.StoragePath,
			&i.FileName,
			&i.FileType,
			&i.MimeType,
			&i.AltText,
			&i.WidthPx,
			&i.HeightPx,
			&i.Cts,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
