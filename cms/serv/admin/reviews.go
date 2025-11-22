package admin

import (
	"fmt"

	"github.com/cms/com/reviews"
	"github.com/gin-gonic/gin"
)
func CrawlProductReviwes(c *gin.Context) {
	reviews, err := reviews.FetchProductReview(c.Request.URL.String(), 10, "1-5", true, true)
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}
	fmt.Println(reviews)
	c.JSON(200, gin.H{
		"reviews": reviews,
	})
}