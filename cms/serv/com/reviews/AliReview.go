package reviews

import (
	"errors"
	"fmt"
	"net/url"
	"regexp"
	"strconv"
	"strings"
	"time"

	json "github.com/bytedance/sonic"

	"github.com/cms/utils"

	"github.com/go-faker/faker/v4"
)

func (ali *AliItem) withStars(istars string) *AliItem {
	stars := strings.Split(istars, ",")
	for _, star := range stars {
		mStar, _ := strconv.Atoi(star)
		if mStar >= 1 && mStar <= 5 {
			ali.Evals = append(ali.Evals, int(mStar*20))
		}
	}
	return ali
}

func (ali *AliItem) setMaxItems(max int) *AliItem {
	ali.MaxItems = max
	return ali
}

func (ali *AliItem) setFilterWords(words string) *AliItem {
	if len(words) > 0 {
		mwords := strings.Split(words, ",")
		for _, word := range mwords {
			ali.FilterWords = append(ali.FilterWords, word)
		}
	}
	return ali
}

func (ali *AliItem) withPicture(flag bool) *AliItem {
	ali.MustPicture = flag
	return ali
}

func (ali *AliItem) withContent(flag bool) *AliItem {
	ali.MustContent = flag
	return ali
}

func (ali *AliItem) checkContent(item *ReviewItem) bool {
	if len(item.BuyerFeedback) == 0 && ali.MustContent == true {
		return false
	}
	return true
}

func (ali *AliItem) checkStar(item *ReviewItem) bool {
	for _, val := range ali.Evals {
		if item.BuyerEval == val {
			return true
		}
	}
	return false
}

func (ali *AliItem) checkPicture(item *ReviewItem) bool {
	if len(item.Images) == 0 && ali.MustPicture == true {
		return false
	}
	return true
}

func (ali *AliItem) checkFilterWords(item *ReviewItem) bool {
	if len(ali.FilterWords) > 0 {
		for _, word := range ali.FilterWords {
			if strings.Contains(item.BuyerTranslationFeedback, word) == true {
				return false
			}
		}
	}
	return true
}

func (ali *AliItem) getReviews() (ReviewItems, error) {
	var data []*ReviewItem
	fmt.Println("ali:", *ali)
	uparse, err := url.Parse(ali.ItemPcUrl)
	fmt.Println("parse_url:", uparse)
	if strings.Contains(uparse.Host, "www") {
		ali.ItemMobileHost = "m.aliexpress.com"
		uparse.Host = "m.aliexpress.com"
	} else {
		ali.ItemMobileHost = "m." + uparse.Host
	}
	if err != nil {
	}
	loader := utils.NewLoader()
	//get pc page content
	loader.SetHeader("Authority", uparse.Host)
	loader.SetHeader("Cache-Control", "max-age=0")
	loader.SetHeader("Upgrade-Insecure-Requests", "1")
	loader.SetHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36")
	loader.SetHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8")
	loader.SetHeader("Referer", "www.aliexpress.com")
	loader.SetHeader("Accept-Encoding", "gzip, deflate, br")
	loader.SetHeader("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,und;q=0.6")
	_, body, err := loader.Get(ali.ItemPcUrl)
	fmt.Println("url:", ali.ItemPcUrl)
	if err != nil {
		return data, err
	}

	//fmt.Println("body:", string(body))
	hp := utils.NewHtmlParser().LoadData(body)
	re, err := regexp.Compile(`/(\d+).html`)
	mid0 := re.FindSubmatch([]byte(ali.ItemPcUrl))
	fmt.Println(mid0)
	if len(mid0) == 2 {
		ali.ItemProductId = fmt.Sprintf("%s", mid0[1])
		fmt.Println("product_id:", ali.ItemProductId)
	} else {
		mid := hp.Partten(`productId="(\d+)"`).FindSubmatch()
		if len(mid) == 2 {
			ali.ItemProductId = fmt.Sprintf("%s", mid[1])
		} else {
			mid1 := hp.Partten(`name="objectId" value="(\d+)"`).FindSubmatch()
			if len(mid1) == 2 {
				ali.ItemProductId = fmt.Sprintf("%s", mid1[1])
			} else {
				mid2 := hp.Partten(`id="hid-product-id" value="(\d+)"`).FindSubmatch()
				if len(mid2) == 2 {
					ali.ItemProductId = fmt.Sprintf("%s", mid2[1])
				}
			}
		}
	}

	if ali.ItemProductId == "" {
		return data, errors.New("[getReviews] get item id or mobile url error")
	}
	ali.ItemMobileUrl = fmt.Sprintf("https://%s/item/%s.html", ali.ItemMobileHost, ali.ItemProductId)
	fmt.Println("mobil url:", ali.ItemMobileUrl)
	//load mobile page content
	mloader := utils.NewLoader()
	mloader.SetHeader("Accept-Encoding", "gzip, deflate, br")
	mloader.SetHeader("Amp-Same-Origin", "true")
	mloader.SetHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36")
	mloader.SetHeader("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,und;q=0.6")
	mloader.SetHeader("Authority", "m.aliexpress.com")
	mloader.SetHeader("Upgrade-Insecure-Requests", "1")
	mloader.SetHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8")
	mloader.Get(ali.ItemMobileUrl)

	mloader.SetHeader("Accept-Encoding", "gzip, deflate, br")
	mloader.SetHeader("Amp-Same-Origin", "true")
	mloader.SetHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36")
	mloader.SetHeader("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,und;q=0.6")
	mloader.SetHeader("Accept", "application/json")
	mloader.SetHeader("Referer", fmt.Sprintf("%s", ali.ItemMobileUrl))
	mloader.SetHeader("Authority", ali.ItemMobileUrl)
	fmt.Println("info:", data, ali.MaxItems)
	fmt.Println("infos:", ali.ItemMobileHost, ali.ItemProductId, ali.ItemMobileHost)
	var totalPage = 2
	for page := 1; page < totalPage; totalPage++ {

		if len(data) >= ali.MaxItems {
			break
		}

		reviewUrl := fmt.Sprintf("https://%s/api/products/%s/feedbacks?page=%d&filter=all&country=US&__amp_source_origin=https://%s", ali.ItemMobileHost, ali.ItemProductId, page, ali.ItemMobileHost)
		fmt.Println("review_url:", reviewUrl)
		_, mbody, err := mloader.Get(reviewUrl)
		if err != nil {
			break
		}
		//
		reviews := AliReviewsList{}
		if err = json.Unmarshal(mbody, &reviews); err != nil {
			break
		}

		totalPage = reviews.Data.TotalPage
		if len(reviews.Data.EvaViewList) > 0 {
			for _, item := range reviews.Data.EvaViewList {
				if len(data) >= ali.MaxItems {
					break
				}
				mItem := &ReviewItem{}
				mItem.BuyerName = faker.FirstName() + " " + faker.LastName()
				mItem.BuyerEval = item.BuyerEval
				mItem.BuyerCountry = item.BuyerCountry
				mItem.BuyerFeedback = item.BuyerFeedback
				mItem.BuyerTranslationFeedback = item.BuyerTranslationFeedback
				mItem.Images = item.Images
				mItem.EvalDate = item.EvalDate
				mItem.Shipping = item.Logistics
				mItem.BuyerGender = item.BuyerGender
				if ali.checkContent(mItem) && ali.checkPicture(mItem) && ali.checkStar(mItem) && ali.checkFilterWords(mItem) {
					data = append(data, mItem)
				}
			}
		} else {
			break
		}

		time.Sleep(time.Millisecond * 2)
		page++
	}

	return data, nil
}

//pc版url, 10,starts="1-5", false,false
func FetchProductReview(url string, num int, starts string, withContent, withPicture bool) (ReviewItems, error) {
	return NewAliItem(url).withContent(withContent).
		withPicture(withPicture).withStars(starts).
		setMaxItems(num).getReviews()

}
