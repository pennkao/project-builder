package admin

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"slices"

	"github.com/cms/admin/dto/hp"
	"github.com/cms/com/oss"
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

type PresignUrlItemReq struct {
	Dir string `json:"dir"`
	FileName string `json:"file_name"`
	Type string `json:"type"`
}

type PresignUrlItemResp struct {
	OrgName string `json:"org_name"`
	Path string `json:"path"`
	FileName string `json:"file_name"` //md5
	PresignUrl string `json:"presign_url"`
}

const (
	saveDir = "./public")
var (
	dirs = []string{"images","files", "css", "js"}
)
func fileUpload(c *gin.Context) {
	
		dir := c.PostForm("dir")
		if !slices.Contains(dirs, dir) {
			hp.Error[any](c,  "Invalid directory")
			return
		}

		// Multipart form 最大 10MB
		if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
			hp.Error[any](c,  "Parse form error: " + err.Error())
			return
		}

		saveDir := filepath.Join(saveDir, dir)
		// 创建目录（如果不存在）
		if err := os.MkdirAll(saveDir, 0755); err != nil {
			hp.Error[any](c,  "Create directory error: " + err.Error())
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


func (t *Cms)PresignUrls(c *gin.Context) {

		var request []PresignUrlItemReq
		if err := c.ShouldBindJSON(&request); err != nil {
			hp.Error[any](c,  "Bind JSON error: " + err.Error())
			return
		}
		if len(request) == 0 {
			hp.Error[any](c,  "No files uploaded")
			return
		}
		
		var responses []PresignUrlItemResp
		var fileNames []string
		for _, fileItem := range request {
			// 生成唯一文件名
			ext := filepath.Ext(fileItem.FileName)
			md5name := utils.SHA256(fileItem.FileName) + ext
			path := fmt.Sprintf("%s/%s", fileItem.Dir, md5name)
			url, err := oss.GeneratePresignedURL(c.Request.Context(), path, fileItem.Type)
			fileNames = append(fileNames, md5name)
			if err != nil {
				log.Println("Generate presigned URL error:", err)
				responses = append(responses, PresignUrlItemResp{OrgName: fileItem.FileName, Path: path, FileName: md5name, PresignUrl:""})
				continue
			}
			fmt.Println(ext,md5name,url,fileItem.Type)
			// 返回 URL
			responses = append(responses, PresignUrlItemResp{OrgName: fileItem.FileName, Path: path, FileName: md5name, PresignUrl: url})
		}

		exists, err := t.Q.GetImagesByNames(c.Request.Context(), fileNames)
		if err == nil {
			md5Names := make(map[string]bool)
			for _, name := range exists {
				md5Names[name] = true
			}
			for k, resp := range responses {
				if _,ok:=md5Names[resp.FileName]; ok {	
					responses[k].PresignUrl = ""
				}
			}
		}

		hp.Success[any](c, responses)
}


