package api

import (
	"github.com/cms/admin/dto/hp"
	"github.com/cms/api/dto/resp"
	"github.com/cms/com/chat"
	"github.com/gin-gonic/gin"
)

type ChatReq struct {
	Action string `json:"action"`
	Message chat.Message `json:"message"`
} 

func Chat(c *gin.Context){
	var req ChatReq
	if err := c.ShouldBindJSON(&req); err != nil {
		hp.Error[any](c, err.Error())
		return
	}
	switch req.Action {
		case "send":
			chat := chat.GetInstance()
	        chat.AddMessage(req.Message)
			resp.Success(c, "")
		case "recv":
			chat := chat.GetInstance()
			messages := chat.GetMessage(req.Message)	
			resp.Success(c, messages)
		default:
			resp.Success(c, "")
	}
}


