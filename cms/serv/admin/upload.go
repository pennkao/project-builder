package admin

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/cms/admin/dto/hp"
	"github.com/cms/utils"
	"github.com/gin-gonic/gin"
)

type UploadResponse struct {
	ID  int    `json:"id"`
	FileName string `json:"file_name"`
	URL string `json:"url"`
}

type ApiResponse struct {
	Code int              `json:"code"`
	Msg  string           `json:"message"`
	Data []UploadResponse `json:"data"`
}
const saveDir = "./dist/images"
func fileUpload(c *gin.Context) {
		// Multipart form 最大 10MB
		if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
			hp.Error[any](c,  "Parse form error: " + err.Error())
			return
		}

		form, _ := c.MultipartForm()
		files := form.File["images[]"]
		if len(files) == 0 {
			hp.Error[any](c,  "No files uploaded")
			return
		}

		var responses []UploadResponse
		for idx, fileHeader := range files {
			// 打开文件
			file, err := fileHeader.Open()
			if err != nil {
				log.Println("Open file error:", err)
				continue
			}
			defer file.Close()

			// 生成唯一文件名
			ext := filepath.Ext(fileHeader.Filename)
			log.Println(fileHeader.Filename)
			filename := utils.SHA256(fileHeader.Filename) + ext
			filePath := filepath.Join(saveDir, filename)
			// 检查文件是否已存在
			if _, err := os.Stat(filePath); os.IsExist(err) {
				responses = append(responses, UploadResponse{ID: idx + 1, FileName: fileHeader.Filename, URL: filename})
				continue
			}
			// 保存文件
			if err := c.SaveUploadedFile(fileHeader, filePath); err != nil {
				log.Println("Save file error:", err)
				continue
			}

			// 返回 URL
			responses = append(responses, UploadResponse{ID: idx + 1, FileName: fileHeader.Filename, URL: filename})
		}
		c.JSON(http.StatusOK, ApiResponse{Code: 0, Msg: "success", Data: responses})

}
