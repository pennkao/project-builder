package ws

import (
	"log"
	"net/http"
	"time"

	"github.com/bytedance/sonic"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// 允许所有来源的请求，生产环境中请根据实际情况调整
		return true
	},
}

var pool = NewPool()
var admins = NewPool()
func Websocket(c *gin.Context) {
	source := c.Query("s")
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Print("upgrade failed: ", err)
		return
	}
	defer conn.Close()

	log.Print("New Client connected", conn.RemoteAddr().String())
	// 为每个连接生成一个唯一的标识符（这里简单使用指针地址）
	client := Client{
		Conn: conn,
		Source: source,
		Addr: conn.RemoteAddr().String(),
		T: time.Now(),
	}

	if source == "admin" {
		admins.Add(conn.RemoteAddr().String(), &client)
	}else{
		pool.Add(conn.RemoteAddr().String(), &client)
	}

	broadcastClientsToAdmin()
	//目的是维护连接
// 读循环
    for {
        _, msgBytes, err := conn.ReadMessage()
        if err != nil {
			pool.Remove(conn.RemoteAddr().String())
			broadcastClientsToAdmin()
            log.Println("connection closed:", err)
            break
        }

        // 解析消息
        var msg Message
        if err := sonic.Unmarshal(msgBytes, &msg); err != nil {
            log.Println("invalid message format:", err)
            continue
        }

		msg.From = client.Addr
		var resp = RespMessage{
				Type: "message",
				Message: msg,
		}
		data, _ := sonic.Marshal(resp)
        // 如果是普通客户端，发送给所有 admin
        if source != "admin" {
			pool.Upadte(conn.RemoteAddr().String())
			admins.Broadcast(data)
        }else{
			pool.SendTo(msg.To, data)
		}
    }

}

func broadcastClientsToAdmin() {
    clientList := []*Client{}
    for k, c := range pool.Pool {
		if time.Until(c.T) > 30*time.Minute {
			pool.Remove(k)
			continue
		}	
        clientList = append(clientList, c)
    }
	var resp = RespMessage{
		Type: "clients",
		Message: clientList,
	}
    data, _ := sonic.Marshal(resp)
	admins.Broadcast(data)
}

