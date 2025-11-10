package rep

import (
	"net/http"

	"github.com/bytedance/sonic"
	"github.com/gin-gonic/gin"
)

// Response 通用返回结构
type response[T any] struct {
	Code    int         `json:"code"`             // 0 表示成功，非0 表示错误
	Message string      `json:"message,omitempty"` // 提示信息
	Data    T `json:"data,omitempty"`    // 返回数据
	
}

func Success[T any](c *gin.Context, data T) {
    c.Header("Content-Type", "application/json; charset=utf-8")
    resp := response[T]{Code: 0, Message: "ok", Data: data}
    b, err := sonic.Marshal(resp)
    if err != nil {
        c.String(http.StatusInternalServerError, "internal error")
        return
    }
    c.Writer.WriteHeader(http.StatusOK)
    c.Writer.Write(b)
}

func Error[T any](c *gin.Context, code int, msg string) {
    c.Header("Content-Type", "application/json; charset=utf-8")
    resp := response[T]{Code: code, Message: msg}
    b, _ := sonic.Marshal(resp)
    c.Writer.WriteHeader(http.StatusOK)
    c.Writer.Write(b)
}