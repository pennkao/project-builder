package request

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

// Bind 解析请求体
func (JsonData) Bind(req *http.Request, obj interface{}) error {
	body, err := io.ReadAll(req.Body)
	if err != nil {
		return err
	}
	return sonic.Unmarshal(body, obj)
}

func Json(c *gin.Context, obj interface{}) error {
	return JsonData{}.Bind(c.Request, obj)
}
