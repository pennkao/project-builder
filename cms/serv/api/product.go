package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/cms/api/dto/resq"
	"github.com/cms/db"
	"github.com/cms/dbtypes"
	"github.com/gin-gonic/gin"
	"golang.org/x/sync/errgroup"
)

type Product struct {
	Main 	db.FetchProductByIdRow `json:"main"`
	Skus 	[]db.FetchProductSkusRow `json:"skus"`
	Options dbtypes.JSON `json:"options"`
	Videos []string     `json:"videos"`
	Specs  dbtypes.JSON `json:"specs"`
	Images []string     `json:"images"`
}

func (t *API) GetProductList(c *gin.Context) {
	sid := c.GetInt64("sid")
	if (sid==0){
		log.Println("error sid")
		return
	}
	// 从查询参数中获取产品 handle
	productList, err := t.Q.FetchProductList(c, db.FetchProductListParams{
		Sid: sid,
		Limit:  6,
		Offset: 0,
	})
	if err != nil {
		return
	}
	c.JSON(http.StatusOK, productList)

}

func (t *API) GetProduct(c *gin.Context) {
	sid := c.GetInt64("sid")
	if (sid==0){
		log.Println("error sid")
		return
	}
	var req resq.IdReq
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("GetProduct error: %v", err)
		return
	}
	var err error
	var product Product
	// 从查询参数中获取产品 handle
	product.Main, err = t.Q.FetchProductById(c, db.FetchProductByIdParams{
		ID: req.Id,
		Sid: sid,
	})
	if err != nil {
		log.Println(err.Error())
		return
	}

	g := new(errgroup.Group)

    g.Go(func() error {
		var err error
		product.Skus, err = t.Q.FetchProductSkus(c, req.Id)
		return err
    })
	g.Go(func() error {
		var err error
		options, err := t.Q.FetchProductOptions(c, req.Id)
		product.Options = options
		return err
	})
	g.Go(func() error {
		var err error
		details, err := t.Q.FetchProductDetail(c, req.Id)
		product.Videos = details.Videos
		product.Images = details.Images
		product.Specs= details.Specs
		return err
	})

	if err := g.Wait(); err != nil {
		log.Println(err.Error())
		return
	}
	fmt.Println(22222)
	c.JSON(http.StatusOK, product)
}

func (t *API) GetProductContent(c *gin.Context){
	sid := c.GetInt64("sid")
	if (sid==0){
		log.Println("error sid")
		return
	}
	var req resq.IdReq
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("GetProductContent error: %v", err)
		return
	}

	content, err:=t.Q.FetchProductContent(c.Request.Context(), req.Id)
	if err!=nil{
		log.Println(err.Error())
		return
	}
	c.String(http.StatusOK, content)
}

