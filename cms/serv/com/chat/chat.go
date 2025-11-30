package chat

import (
	"sync"
	"time"
)

type Message struct {
    TS   int64   `json:"ts"`             // 时间戳
	Source string `json:"source"`
    From string  `json:"from,omitempty"`           // 发送者
    To string    `json:"to,omitempty"`             // 接收者
    Text string  `json:"text,omitempty"`           // 消息内容
    Type *string `json:"type,omitempty"` // 可选类型，例如 "text" 或 "image"
    URL  *string `json:"url,omitempty"`  // 可选图片或文件 URL
}


type ClientChat struct {
	Client    string `json:"client"`
	Source    string `json:"source"`
	Messages   []Message 
	LastMessage Message `json:"last_message"`
	IsNew       bool `json:"is_new"`
	StartItme   time.Time `json:"start_time"`
	LastTime time.Time `json:"last_time"`
}
type Chat struct {
	ChatClients map[string]*ClientChat
	Mux          sync.Mutex
	Ttl          time.Duration  // clientId 超过30分钟未活动就清理
}

var (
    instance *Chat
    once     sync.Once
)




func GetInstance() *Chat {
    once.Do(func() {
        instance = NewChat()
    })
    return instance
}

func NewChat()*Chat{
	return &Chat{
		ChatClients: make(map[string]*ClientChat),
		Mux:         sync.Mutex{},
		Ttl:         30 * time.Minute, 
	}
}

func (t *Chat)GetMessage(msg Message) []Message{
	t.Mux.Lock()
	defer t.Mux.Unlock()
	var messages = make([]Message, 0)
	var unReadMessage = make([]Message, 0)
	if _,ok:=t.ChatClients[msg.From];ok{
		for _, message := range t.ChatClients[msg.From].Messages{
			if message.To == msg.To{
				messages = append(messages, message)
				continue
			}
			unReadMessage = append(unReadMessage, message)

		}	
	}
	t.ChatClients[msg.From].Messages = unReadMessage 
	return messages	
}

func (t *Chat)AddMessage(msg Message){
	t.Mux.Lock()
	defer t.Mux.Unlock()
	if _,ok:=t.ChatClients[msg.From];ok{
		t.ChatClients[msg.From].Client = msg.From
		t.ChatClients[msg.From].Messages = append(t.ChatClients[msg.From].Messages, msg)
		t.ChatClients[msg.From].LastMessage = msg
		t.ChatClients[msg.From].IsNew = true
		t.ChatClients[msg.From].LastTime = time.Now()
	}else{
		t.ChatClients[msg.From] = &ClientChat{
			Client: msg.From,	
			Messages:   []Message{msg},
			LastMessage: msg,
			Source: msg.Source,
			IsNew:       true,
			StartItme:   time.Now(),
			LastTime: time.Now(),
		}
	}
}

func (t *Chat)GetClients() []ClientChat{
	var clients = make([]ClientChat, 0)
	for k,v:=range t.ChatClients{
		if v.LastTime.Sub(v.StartItme) > t.Ttl{
			delete(t.ChatClients, k)
			continue
		}
		clients = append(clients, *v)
	}
	return clients
}