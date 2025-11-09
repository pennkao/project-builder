// internal/database/pool.go
package database

import (
	"context"
	"fmt"
	"time"

	"github.com/cms/db"
	"github.com/jackc/pgx/v5/pgxpool"
)

// NewPool 创建并返回一个 pgx 连接池
func NewPool(ctx context.Context, dsn string) (*db.Queries, error) {
    config, err := pgxpool.ParseConfig(dsn)
    if err != nil {
        return nil, fmt.Errorf("failed to parse DSN: %w", err)
    }

    // 可选：自定义连接池配置
    config.MaxConns = 20           // 最大连接数
    config.MinConns = 5            // 最小连接数
    config.MaxConnLifetime = 30 * time.Minute
    config.MaxConnIdleTime = 10 * time.Minute
    config.HealthCheckPeriod = 5 * time.Second

    pool, err := pgxpool.NewWithConfig(ctx, config)
    if err != nil {
        return nil, fmt.Errorf("failed to create pool: %w", err)
    }

    // 可选：测试连接是否可用
    if err := pool.Ping(ctx); err != nil {
        pool.Close()
        return nil, fmt.Errorf("failed to ping database: %w", err)
    }

    return db.New(pool), nil
}