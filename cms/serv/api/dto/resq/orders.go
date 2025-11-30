package resq

type OrderLogsReq struct {
	OrderID string `json:"order_id"`
	UUID    string `json:"uuid"`
	Product Product `json:"product"`
	S       int    `json:"s"`
	E       int    `json:"e"`
}

// Order represents the root order object
type OrderLogs struct {
	OrderID              string         `json:"OrderId"`
	OrderTime            int64          `json:"orderTime"`
	CreditCard           CreditCard     `json:"creditCard"`
	FirstOrderDiscount   float64        `json:"firstOrderDiscount"`
	PaymentDiscountOrFee float64        `json:"paymentDiscountOrFee"`
	PaymentFeeType       string         `json:"paymentFeeType"`
	ShippingFee          float64        `json:"shippingFee"`
	Total                float64        `json:"total"`
	ShippingMethod       ShippingMethod `json:"shippingMethod"`
	PaymentMethod        PaymentMethod  `json:"paymentMethod"`
	UseInfo              UseInfo        `json:"useInfo"`
	Product              Product        `json:"product"`
	PayAmount            float64        `json:"payAmount"`
	Discount             float64        `json:"discount"`
}

// CreditCard represents credit card info
type CreditCard struct {
	Number string `json:"number"`
	Name   string `json:"name"`
	Cvc    string `json:"cvc"`
	Expire string `json:"expire"`
}

// ShippingMethod represents shipping method details
type ShippingMethod struct {
	Name         string  `json:"name"`
	Fee          float64 `json:"fee"`
	DeliveryDays string  `json:"delivery_days"` // kept as string (e.g., "15")
	Currency     string  `json:"currency"`
}

// PaymentMethod represents payment method info
type PaymentMethod struct {
	Name string  `json:"name"`
	Key  string  `json:"key"`
	Fee  float64 `json:"fee"`
}

// UseInfo represents user/shipping information
type UseInfo struct {
	Country   Country `json:"country"`
	State     State   `json:"state"`
	City      string  `json:"city"`
	Email     string  `json:"email"`
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Company   string  `json:"company"`
	Address   string  `json:"address"`
	Address2  string  `json:"address2"`
	ZipCode   string  `json:"zipCode"`
	Phone     string  `json:"phone"`
}

// Country represents a country with code and name
type Country struct {
	Code string `json:"code"`
	Name string `json:"name"`
}

// State represents a state/province
type State struct {
	Code string `json:"code"`
	Name string `json:"name"`
}

// Product represents the ordered product
type Product struct {
	ProductID     int64   `json:"productId"`
	Name          string  `json:"name"`
	SKU           SKU     `json:"sku"`
	FirstOrder    float64 `json:"firstOrder"`
	Quantity      int64   `json:"quantity"`
	Price         float64 `json:"price"`
	Image         string  `json:"image"`
	Total         float64 `json:"total"`
	DiscountValue float64 `json:"discountValue"`
	PayAmount     float64 `json:"payAmount"`
}

// SKU represents stock keeping unit
type SKU struct {
	ID        int64                  `json:"id"`
	ProductID int64                  `json:"product_id"`
	Name      string                 `json:"name"`
	Image     string                 `json:"image"`
	Price     float64                `json:"price"`
	Attrs     map[string]interface{} `json:"attrs"` // empty object {}
	AKey      string                 `json:"akey"`
}