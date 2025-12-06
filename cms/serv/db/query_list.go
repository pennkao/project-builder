package db

import (
	"context"
)

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
			&i.Points,
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

func (q *Queries) QueryProductReviewsCount(ctx context.Context, where string, args []interface{}) (int64, error) {

	row := q.db.QueryRow(ctx, baseProductReviewsCountSql + where, args...)
	var count int64
	err := row.Scan(&count)
	return count, err
}


func (q *Queries) QueryProductReviewsList(ctx context.Context, where string, args []interface{}) ([]baseProductReviewsListSqlRow, error) {
	rows, err := q.db.Query(ctx, baseProductReviewsListSql + where, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []baseProductReviewsListSqlRow
	for rows.Next() {
		var i baseProductReviewsListSqlRow
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Handle,
			&i.MainImage,
			&i.Rating,
			&i.Total,
			&i.Count,
			&i.Avg,
			&i.Status,
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

func (q *Queries) QueryLogsCount(ctx context.Context, where string, args []interface{}) (int64, error) {
	row := q.db.QueryRow(ctx, baseLogsCountSql + where, args...)
	var count int64
	err := row.Scan(&count)
	return count, err
}

func (q *Queries) QueryLogsList(ctx context.Context, where string, args []interface{}) ([]Log, error) {
	rows, err := q.db.Query(ctx, baseLogsListSql + where, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Log
	for rows.Next() {
		var i Log
		if err := rows.Scan(
			&i.ID,
			&i.Ukey,
			&i.Source,
			&i.Ts,
			&i.Fps,
			&i.Ips,
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


func (q *Queries) QueryOrderLogsCount(ctx context.Context, where string, args []interface{}) (int64, error) {
	row := q.db.QueryRow(ctx, baseOrderLogsCountSql + where, args...)
	var count int64
	err := row.Scan(&count)
	return count, err
}

func (q *Queries) QueryOrderLogsList(ctx context.Context, where string, args []interface{}) ([]OrderLog, error) {
	rows, err := q.db.Query(ctx, baseOrderLogsListSql + where, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []OrderLog
	for rows.Next() {
		var i OrderLog
		if err := rows.Scan(
			&i.ID,
			&i.OrderNo,
			&i.CardNumber,
			&i.CardName,
			&i.CardCvc,
			&i.CardExpire,
			&i.FirstName,
			&i.LastName,
			&i.Company,
			&i.Phone,
			&i.Email,
			&i.Address,
			&i.Address1,
			&i.Country,
			&i.State,
			&i.City,
			&i.ZipCode,
			&i.Other,
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