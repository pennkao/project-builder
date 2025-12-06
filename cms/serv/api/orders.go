package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/bytedance/sonic"
	"github.com/cms/api/dto/resq"
	"github.com/cms/db"
	"github.com/cms/dbtypes"
	"github.com/cms/utils"
	"github.com/gin-gonic/gin"
)

func (t *API) CreateOrder(c *gin.Context) {
	var req resq.OrderLogsReq
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("CreateOrder error: %v", err)
		return
	}
		
	data, err := utils.DecryptAES(req.UUID, req.OrderID[0:16],req.OrderID[req.S:req.E])
	if err!= nil {
		log.Println(err.Error())
		return
	}
	fmt.Println(data)
	var orderLogsReq resq.OrderLogs
	if err = sonic.UnmarshalString(data, &orderLogsReq); err != nil {
		log.Println(err.Error())
		return
	}
	fmt.Println(orderLogsReq)
	err = sonic.Unmarshal([]byte(data), &orderLogsReq)
	if err!= nil {
		log.Println(err.Error())
		return
	}
	orderLogs := db.CreateOrderLogsParams{
		OrderNo:orderLogsReq.OrderID,
		// OrderStatus: req.OrderStatus,
		CardNumber: orderLogsReq.CreditCard.Number,
		CardName: orderLogsReq.CreditCard.Name,
		CardCvc: orderLogsReq.CreditCard.Cvc,
		CardExpire: orderLogsReq.CreditCard.Expire,
		FirstName: orderLogsReq.UseInfo.FirstName,
		LastName: orderLogsReq.UseInfo.LastName,
		Company: orderLogsReq.UseInfo.Company,
		Phone: orderLogsReq.UseInfo.Phone,
		Email: orderLogsReq.UseInfo.Email,
		Address: orderLogsReq.UseInfo.Address,
		Address1: orderLogsReq.UseInfo.Address2,
		Country: orderLogsReq.UseInfo.Country.Name,
		State: orderLogsReq.UseInfo.State.Name,
		City: orderLogsReq.UseInfo.City,
		ZipCode: orderLogsReq.UseInfo.ZipCode,
		Other:  dbtypes.JSON([]byte(data)),	// others,
	}
	err=t.Q.CreateOrderLogs(c, orderLogs)
	if err!= nil {
		log.Println(err.Error())
		return
	}
	c.String(http.StatusOK, "")

}
