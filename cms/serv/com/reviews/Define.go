package reviews

type AliItem struct {
	ItemPcUrl      string
	ItemMobileHost string
	ItemMobileUrl  string
	ItemProductId  string
	Evals          []int
	FilterWords    []string
	MustPicture    bool
	MustContent    bool
	MaxItems       int
}

type AliReviewsList struct {
	Code int `json:"code"`
	Cost int `json:"cost"`
	Data struct {
		AllImageList []string `json:"allImageList"`
		CurrentPage  int      `json:"currentPage"`
		EvaViewList  []struct {
			Anonymous                    bool          `json:"anonymous"`
			BuyerAddFbDays               int           `json:"buyerAddFbDays"`
			BuyerCountry                 string        `json:"buyerCountry"`
			BuyerEval                    int           `json:"buyerEval"`
			BuyerFeedback                string        `json:"buyerFeedback"`
			BuyerGender                  string        `json:"buyerGender,omitempty"`
			BuyerHeadPortrait            string        `json:"buyerHeadPortrait,omitempty"`
			BuyerID                      interface{}   `json:"buyerId,omitempty"`
			BuyerName                    string        `json:"buyerName"`
			BuyerTranslationFeedback     string        `json:"buyerTranslationFeedback"`
			EvalDate                     string        `json:"evalDate"`
			Images                       []string      `json:"images,omitempty"`
			Logistics                    string        `json:"logistics"`
			SkuInfo                      string        `json:"skuInfo"`
			Thumbnails                   []string      `json:"thumbnails,omitempty"`
			BuyerAddFbBuyerReplyContent  string        `json:"buyerAddFbBuyerReplyContent,omitempty"`
			BuyerAddFbBuyerReplyDate     string        `json:"buyerAddFbBuyerReplyDate,omitempty"`
			BuyerAddFbContent            string        `json:"buyerAddFbContent,omitempty"`
			BuyerAddFbDate               string        `json:"buyerAddFbDate,omitempty"`
			BuyerAddFbImages             []interface{} `json:"buyerAddFbImages,omitempty"`
			BuyerAddFbSellerReplyContent string        `json:"buyerAddFbSellerReplyContent,omitempty"`
			BuyerAddFbSellerReplyDate    string        `json:"buyerAddFbSellerReplyDate,omitempty"`
			BuyerAddFbThumbnails         []interface{} `json:"buyerAddFbThumbnails,omitempty"`
			BuyerAddFbTranslation        string        `json:"buyerAddFbTranslation,omitempty"`
		} `json:"evaViewList"`
		FilterInfo struct {
			CurrentFilter   string `json:"currentFilter"`
			FilterStatistic []struct {
				FilterCode  string `json:"filterCode"`
				FilterCount int    `json:"filterCount"`
			} `json:"filterStatistic"`
		} `json:"filterInfo"`
		PageSize                   int `json:"pageSize"`
		ProductEvaluationStatistic struct {
			EvarageStar     float64 `json:"evarageStar"`
			EvarageStarRage float64 `json:"evarageStarRage"`
			FiveStarNum     int     `json:"fiveStarNum"`
			FiveStarRate    float64 `json:"fiveStarRate"`
			FourStarNum     int     `json:"fourStarNum"`
			FourStarRate    float64 `json:"fourStarRate"`
			NegativeNum     int     `json:"negativeNum"`
			NegativeRate    float64 `json:"negativeRate"`
			NeutralNum      int     `json:"neutralNum"`
			NeutralRate     float64 `json:"neutralRate"`
			OneStarNum      int     `json:"oneStarNum"`
			OneStarRate     float64 `json:"oneStarRate"`
			PositiveNum     int     `json:"positiveNum"`
			PositiveRate    float64 `json:"positiveRate"`
			ThreeStarNum    int     `json:"threeStarNum"`
			ThreeStarRate   float64 `json:"threeStarRate"`
			TotalNum        int     `json:"totalNum"`
			TwoStarNum      int     `json:"twoStarNum"`
			TwoStarRate     float64 `json:"twoStarRate"`
		} `json:"productEvaluationStatistic"`
		TotalNum  int    `json:"totalNum"`
		TotalPage int    `json:"totalPage"`
		Version   string `json:"version"`
	} `json:"data"`
	Success bool `json:"success"`
}

type ReviewItem struct {
	BuyerName                string   `json:"buyer_name"`
	BuyerEval                int      `json:"buyer_eval"`
	BuyerCountry             string   `json:"buyer_country"`
	BuyerFeedback            string   `json:"buyer_feedback"`
	BuyerGender              string   `json:"buyer_gender"`
	BuyerTranslationFeedback string   `json:"buyer_translation_feedback"`
	Images                   []string `json:"images""`
	EvalDate                 string   `json:"publish_date"`
	Shipping                 string   `json:"shipping"`
}

func NewAliItem(itemPcUrl string) *AliItem {
	return &AliItem{
		ItemPcUrl:     itemPcUrl,
		ItemMobileUrl: "",
		ItemProductId: "",
	}
}
type ReviewItems []*ReviewItem