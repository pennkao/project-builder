package utils

import (
	"bytes"
	"fmt"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"mime"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)
const (
	DefaultUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
)

func fileExists(path string) bool {
	_, err := os.Stat(path)
	return !os.IsNotExist(err)
}

func DownloadImage(url, destPath string) (error,string,*ImageInfo) {
	client := &http.Client{}
	urls := strings.Split(url, "?")
	fmt.Println(urls)
	if len(urls) == 0 {
		return fmt.Errorf("url is not valid"), "", nil
	}
	req, err := http.NewRequest("GET", urls[0], nil)
	if err != nil {
		return err, "", nil
	}
	req.Header.Set("User-Agent", DefaultUserAgent)

	resp, err := client.Do(req)
	if err != nil {
		return err, "", nil
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("status code: %d", resp.StatusCode), "", nil
	}
	// 1. 先读取全部内容到内存
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return err, "", nil
	}
	defer resp.Body.Close()

	// 2. 用 bytes.NewReader 创建可重复读的 Reader
	readerForInfo := bytes.NewReader(bodyBytes)
	info, err := GetImageInfo(readerForInfo)
	if err != nil {
		return err, "", nil
	}
	exts := strings.Split(info.MIMEType, "/")
	if len(exts) == 0 {
		return fmt.Errorf("image is not valid"), "", nil
	}
	filename := fmt.Sprintf("%s.%s", SHA256(urls[0]), exts[len(exts)-1])
	filePath:=filepath.Join(destPath, filename)

	// 3. 创建文件
	fileExists := fileExists(filePath)
	if fileExists {
		return fmt.Errorf("file exists"), "", nil
	}

	// 可选：检查是否为图片
	contentType := resp.Header.Get("Content-Type")
	if contentType == "" {
		// 尝试从文件扩展名推断
		ext := filepath.Ext(destPath)
		if ext == "" {
			// 或从 URL 推断
			ext = filepath.Ext(urls[0])
		}
		contentType = mime.TypeByExtension(ext)
	}
	if !strings.HasPrefix(contentType, "image/") {
		fmt.Printf("⚠️ 警告: Content-Type 不是图片 (%s)，但仍继续下载...\n", contentType)
	}

	// 3. 再次创建 Reader 写入文件
	readerForFile := bytes.NewReader(bodyBytes)
	file, err := os.Create( filePath)
	if err != nil {
		return err, "", nil
	}
	defer file.Close()

	_, err = io.Copy(file, readerForFile)
	return err, filename,info
}



// ImageInfo 存储图片信息
type ImageInfo struct {
	MIMEType string
	Width    int
	Height   int
}

// getImageInfo 从 io.Reader 中读取图片信息（MIME + 尺寸）
func GetImageInfo(r io.Reader) (*ImageInfo, error) {
	// 第一步：嗅探 MIME 类型（基于文件头）
	buffer := make([]byte, 512)
	n, err := r.Read(buffer)
	if err != nil && err != io.EOF {
		return nil, fmt.Errorf("读取文件头失败: %w", err)
	}
	contentType := http.DetectContentType(buffer[:n])

	// 第二步：重置 reader（因为上面已经读了一部分）
	// 使用 io.MultiReader 把已读 buffer 和剩余内容拼回去
	reader := io.MultiReader(strings.NewReader(string(buffer[:n])), r)

	// 第三步：解码图片获取尺寸
	img, _, err := image.DecodeConfig(reader)
	if err != nil {
		return nil, fmt.Errorf("无法解析图片尺寸: %w", err)
	}

	return &ImageInfo{
		MIMEType: contentType,
		Width:    img.Width,
		Height:   img.Height,
	}, nil
}

