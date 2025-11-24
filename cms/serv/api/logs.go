package api

import (
	"log"
	"time"

	"github.com/cms/admin/dto/hp"
	"github.com/cms/db"
	"github.com/gin-gonic/gin"
)

var cache map[string]time.Time

func (t *API) CreateLogs(c *gin.Context) {
	var req db.CreateLogParams
	    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error()+"55555555555555")
        return
    }

	if _, ok := cache[req.Ukey]; ok {
		// hp.Error[any](c,  "uid already exist")
		return
	}
	// if utils.SHA256(req.Fps)!=req.Uid {
	// 	hp.Error[any](c,  "uid not match")
	// 	return
	// }
	// 从查询参数中获取产品 handle
	err:=t.Q.CreateLog(c, req)
	if err != nil {
		log.Println(err)
	}
	cache[req.Ukey] = time.Now();
	for k,v:=range cache{
		if time.Since(v) > time.Hour {
			delete(cache, k)
		}	
	}
}