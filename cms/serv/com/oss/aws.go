package oss

import (
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

var (
	bucketName = "oss"
	accountId = "d9016316b0f575f594785e3e6bfff146"
	r2Endpoint = "https://d9016316b0f575f594785e3e6bfff146.r2.cloudflarestorage.com" // 替换成你的 R2 Endpoint
	accessKeyId = "25ea42e41c5080f2bf155e13482d7f9e"
	// accessKeyId = "kaxAv7WbBV03CWROPT5eeBtM6wz0TEoGib5anj-x"
	accessKeySecret = "f2f8c5f4e28b6b76da038165d005812ae8a2cecdbd22c9a9f599d4829d829f7f"
	// accessKeySecret = "25ea42e41c5080f2bf155e13482d7f9e"
	randomString = "f2f8c5f4e28b6b76da038165d005812ae8a2cecdbd22c9a9f599d4829d829f7f"  //
)

func GeneratePresignedURL(ctx context.Context, key string, fileType string) (string, error) {
	cfg, err := config.LoadDefaultConfig(ctx,
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(accessKeyId, accessKeySecret, "")),
		config.WithRegion("auto"), // Required by SDK but not used by R2
	)
	if err != nil {
		log.Printf("failed to load default config: %v", err)
	}

	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.BaseEndpoint = aws.String(fmt.Sprintf("https://%s.r2.cloudflarestorage.com", accountId))
	})
	presignClient := s3.NewPresignClient(client)

	presignResult, err := presignClient.PresignPutObject(ctx, &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(key),
		ContentType: aws.String(fileType),
	})

	if err != nil {
		return "", err
	}

	return presignResult.URL, nil
}