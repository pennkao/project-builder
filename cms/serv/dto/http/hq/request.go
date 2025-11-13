package hq

import (
	"io"
	"net/http"

	"github.com/bytedance/sonic"
	"github.com/gin-gonic/gin"
)

type JsonData struct{}

func (JsonData) Name() string {
	return "sonic-json"
}

func (JsonData) bind(req *http.Request, obj interface{}) error {
	body, err := io.ReadAll(req.Body)
	if err != nil {
		return err
	}
	return sonic.Unmarshal(body, obj)
}

func Json(c *gin.Context, obj interface{}) error {
	return JsonData{}.bind(c.Request, obj)
}
