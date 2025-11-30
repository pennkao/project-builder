package ws

import (
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

type RespMessage struct {
	Type string `json:"type"`
	Message any `json:"message"`
}

type Client struct {
	T    time.Time `json:"t"`
	Source string 	`json:"source"`
	Addr string `json:"addr"`
	Conn *websocket.Conn 
}

func (c *Client) Send(message []byte) error {
	return c.Conn.WriteMessage(websocket.TextMessage, message)
}

func (c *Client) Close() error {
	return c.Conn.Close()
}

type ClientPool struct{
	Pool map[string]*Client
	Mutx sync.Mutex
}


func NewPool() *ClientPool{
	return &ClientPool{
		Pool: make(map[string]*Client),
		Mutx: sync.Mutex{},
	}
}

func (c *ClientPool) Add(key string, client *Client) {
	c.Mutx.Lock()
	defer c.Mutx.Unlock()
	if _,ok:=c.Pool[key];ok{
		return
	}	
	c.Pool[key] = client
}

func (c *ClientPool) Broadcast(message []byte) {
	c.Mutx.Lock()
	defer c.Mutx.Unlock()
	for _, client := range c.Pool {
		client.Send(message)
	}
}	
func (c *ClientPool) SendTo(target string, message []byte){
	c.Mutx.Lock()
	defer c.Mutx.Unlock()
	if client,ok:=c.Pool[target];ok{
		client.Send(message)
	}	
}

// 关闭客户端
func (c *ClientPool) Cleanup() {
	c.Mutx.Lock()
	defer c.Mutx.Unlock()	
	for k, client := range c.Pool {
		if time.Since(client.T) > 30* time.Minute {
			client.Close()
			delete(c.Pool, k)
		}
	}
}

type Message struct {
    TS   int64   `json:"ts"`             // 时间戳
	Source string `json:"source"`
    From string  `json:"from,omitempty"`           // 发送者
    To string    `json:"to,omitempty"`             // 接收者
    Text string  `json:"text,omitempty"`           // 消息内容
    Type *string `json:"type,omitempty"` // 可选类型，例如 "text" 或 "image"
    URL  *string `json:"url,omitempty"`  // 可选图片或文件 URL
}
