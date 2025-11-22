package admin

import (
	"log"

	"github.com/cms/admin/dto/hp"
	"github.com/cms/admin/dto/hq"
	"github.com/cms/db"
	"github.com/cms/utils"
	"github.com/gin-gonic/gin"
)

func (t *Cms) AddImages(c *gin.Context) {
	var req hq.ImagesReq
    if err := c.ShouldBindJSON(&req); err != nil {
        hp.Error[any](c,  err.Error())
        return
    }
	if len(req.Images) == 0 {
		hp.Error[any](c, "images is empty")
		return
	}

	params := make([]db.BatchCreateImagesParams, 0, len(req.Images))
	for _, v := range req.Images {
		err, filename, info := utils.DownloadImage(v, "./public/images")
		if err != nil {
			log.Printf("DownloadImage: %v", err)
			continue
		}
		params = append(params, db.BatchCreateImagesParams{
			StoragePath: v,
			FileName: filename,
			FileType: "",
			MimeType: info.MIMEType,
			HeightPx: int32(info.Height),
			WidthPx:  int32(info.Width),
		})
	}
	// fmt.Println(params)
	results := t.Q.BatchCreateImages(c.Request.Context(), params)
	results.Exec(func(i int, err error) {
		if err != nil {
			hp.Error[any](c,  err.Error())
			return
		}
	})

	hp.Success[any](c, req.Images)
}