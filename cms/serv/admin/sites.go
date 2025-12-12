package admin

import (
	"context"
	"fmt"
	"log"
	"strings"
	"sync"

	"github.com/cms/admin/dto/hp"
	"github.com/cms/db"
	"github.com/cms/utils"
	"github.com/gin-gonic/gin"
)

var Origins map[string]int64
var mu sync.Mutex



func DeleteDomain(domain string) {

	mu.Lock()
	defer mu.Unlock()
	delete(Origins, domain)	
}

func AddDomain(domain string) {
	mu.Lock()
	defer mu.Unlock()
	if _, ok := Origins[domain]; !ok {
		Origins[domain] = 0
	}
}



func (t *Cms) InitOrigins(){
    Origins = make(map[string]int64)
	domains, err := t.Q.GetDomains(context.Background())
	fmt.Println(domains)
	if err != nil {
		log.Printf("failed to get domains: %v", err)
	}
	for _, domain := range domains {
		Origins[domain.Domain] = domain.ID
	}
	Origins["http://localhost:5173"] = 0
}


func (t *Cms) CreateSite(c *gin.Context) {
	// 从查询参数中获取产品 handle
	var req db.CreateSiteParams
	if err := c.ShouldBindJSON(&req); err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	req.ID = int64(utils.Fnv1a32(strings.TrimSpace(req.Domain)))
	err := t.Q.CreateSite(c.Request.Context(), req)
	if err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	AddDomain(req.Domain)
	hp.Success[any](c, nil) // 返回产品数量
}

func (t *Cms) UpdateSite(c *gin.Context) {
    var req db.CreateSiteParams
	if err := c.ShouldBindJSON(&req); err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	req.ID = int64(utils.Fnv1a32(strings.TrimSpace(req.Domain)))
	site, err := t.Q.GetSite(c.Request.Context(), req.ID)
	if err != nil {
		t.Q.CreateSite(c.Request.Context(), req)
		hp.Success(c,"")
		return
	}

	defer func() {
		t.Q.UpdateProductSite(c.Request.Context(), db.UpdateProductSiteParams{
			Sid: site.ID,
			Sid_2: req.ID,
		})	
	}()	

	err = t.Q.UpdateSite(c.Request.Context(), db.UpdateSiteParams{
		ID: req.ID,
		Name: req.Name,
		Stype: req.Stype,
		Site: req.Site,
		Config: req.Config,
		Domain: req.Domain,
	})
	if err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	hp.Success[any](c, nil) // 返回产品数量	
}



func (t *Cms) SyncSite(c *gin.Context, whereId, toId int64) {

	t.Q.UpdateProductSite(c.Request.Context(), db.UpdateProductSiteParams{
			Sid: whereId,
			Sid_2: 0,
	})	
}

