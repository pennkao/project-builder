package hq

type FetcherReq struct {
	Id     int64  `json:"id"`
	Target string `json:"target"`
}

type FetchersReq struct {
	Ids    []int64 `json:"ids"`
	Target string  `json:"target"`
}

type DeleterReq struct {
	Id     int64  `json:"id"`
	Target string `json:"target"`
}

type DeletersReq struct {
	Ids    []int64 `json:"ids"`
	Target string  `json:"target"`
}