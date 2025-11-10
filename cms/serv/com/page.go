package com

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

type PageResponse struct {
	List  interface{} `json:"list"`
	Total int32         `json:"total"`
	Size  int32         `json:"size"`
	Page  int32         `json:"page"`
}

func NewPage(c *gin.Context) *PageResponse {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	size, _ := strconv.Atoi(c.DefaultQuery("size", "10"))
	return &PageResponse{
		Page:  int32(page),
		Size:  int32(size),

	}
}

func (p *PageResponse) GetOffset() int32 {
    return int32((p.Page-1)*p.Size)
}
func (p *PageResponse) GetLimit() int32 {
    return int32(p.Size)
}
func (p *PageResponse) SetTotal(total int) {
	p.Total = int32(total)
}

func (p *PageResponse) SetList(list interface{}) {
	p.List = list
}
