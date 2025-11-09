package main

import (
	"context"
	"log"

	"github.com/cms/admin"
	"github.com/cms/api"
	"github.com/cms/database"
	"github.com/cms/router"
)

func main() {
	ctx := context.Background()
	dsn := "postgres://dproot:123456@localhost:5432/vtx_cms?sslmode=disable"
	query, err := database.NewPool(ctx, dsn)
	if err != nil {
		log.Fatalf("failed to create database pool: %v", err)
	}
	apiQuery := api.NewApi(query)
	cmsQuery := admin.NewCms(query)
	r := router.SetupRouter(apiQuery, cmsQuery)
    // 提供前端静态资源
	// Start server on port 8080 (default)
	// Server will listen on 0.0.0.0:8080 (localhost:8080 on Windows)
	if err := r.Run(); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}