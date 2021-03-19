1. url service: http://localhost:8055/
2. url s3: http://localhost:4566/
3. status localstack: http://localhost:4566/

### start environment
```shell
docker-compose up -d
```

### configure aws
```
aws configure
```
1. access key: 123
2. secret key: xyz
3. region: us-east-1
4. default output format: json

### create a bucket
```
aws --endpoint-url=http://localhost:4566 s3 mb s3://demo-bucket
```

### configure acl
```
aws --endpoint-url=http://localhost:4566 s3api put-bucket-acl --bucket demo-bucket --acl public-read
```

### run
```
node test-upload.js
```






