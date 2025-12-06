package api

import (
	"log"
	"net/http"
	"strconv"

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
	// 从查询参数中获取产品 handle
	productList, err := t.Q.FetchProductList(c, db.FetchProductListParams{
		Limit:  6,
		Offset: 0,
	})
	if err != nil {
		return
	}
	c.JSON(http.StatusOK, productList)

}

func (t *API) GetProduct(c *gin.Context) {
	id := c.Param("id")
	id64,err:=strconv.ParseInt(id, 10, 64)
	if err!=nil{
		log.Println(err.Error())
		return 
	}
	var product Product
	// 从查询参数中获取产品 handle
	product.Main, err = t.Q.FetchProductById(c, id64)
	if err != nil {
		log.Println(err.Error())
		return
	}

	g := new(errgroup.Group)

    g.Go(func() error {
		var err error
		product.Skus, err = t.Q.FetchProductSkus(c, id64)
		return err
    })
	g.Go(func() error {
		var err error
		options, err := t.Q.FetchProductOptions(c, id64)
		product.Options = options
		return err
	})
	g.Go(func() error {
		var err error
		details, err := t.Q.FetchProductDetail(c, id64)
		product.Videos = details.Videos
		product.Images = details.Images
		product.Specs= details.Specs
		return err
	})

	if err := g.Wait(); err != nil {
		log.Println(err.Error())
		return
	}
	c.JSON(http.StatusOK, product)
}

func (t *API) GetProductContent(c *gin.Context){
	id := c.Param("id")
	id64,err:=strconv.ParseInt(id, 10, 64)
	if err!=nil{
		log.Println(err.Error())
		return 
	}
	content, err:=t.Q.FetchProductContent(c.Request.Context(), id64)
	if err!=nil{
		log.Println(err.Error())
		return
	}
	c.String(http.StatusOK, content)
}

