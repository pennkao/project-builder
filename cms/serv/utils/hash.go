package utils

import (
	"crypto/md5"
	"crypto/sha256"
	"encoding/hex"
	"math/rand"
	"strings"
	"time"
)

func FNV1a64(handle string) uint64 {
	var hash uint64 = 0xcbf29ce484222325
	const prime uint64 = 0x100000001b3

	for i := 0; i < len(handle); i++ {
		hash ^= uint64(handle[i])
		hash *= prime
	}
	return hash
}

func Fnv1a32(s string) uint32 {
	const (
		offsetBasis uint32 = 2166136261
		prime       uint32 = 16777619
	)
	hash := offsetBasis
	for i := 0; i < len(s); i++ {
		hash ^= uint32(s[i])
		hash *= prime
	}
	return hash
}

// GetStringMD5 返回字符串的 MD5 值（32位小写）
func MD5(s string) string {
    sum := md5.Sum([]byte(s))
    return hex.EncodeToString(sum[:])
}

// GetStringSHA256 返回字符串的 SHA256 值（64位小写）
func SHA256(s string) string {
    sum := sha256.Sum256([]byte(s))
    return hex.EncodeToString(sum[:])
}

func Md5Salt(s string, salt string) string {
    sum := md5.Sum([]byte(s + salt))
    return hex.EncodeToString(sum[:])
}

func GenRandomString(length int) string {
    // 定义字符集，这里包括大小写字母和数字
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    // 设置随机种子
    seed := rand.NewSource(time.Now().UnixNano())
    random := rand.New(seed)

    // 创建一个builder来构建字符串，比直接使用+=效率高
    var builder strings.Builder
    builder.Grow(length)

    // 生成随机字符串
    for i := 0; i < length; i++ {
        builder.WriteByte(charset[random.Intn(len(charset))])
    }

    return builder.String()
}