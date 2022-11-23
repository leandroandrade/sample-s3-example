# S3 localstack

Example using upload image to S3 bucket in localhost with [Localstack](https://github.com/localstack/localstack)

## Configurations:

URL services:
* health: http://localhost:4566/health

### start environment
```
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

* Localstack do not use the credencials configured but it`s verify if then exists.

Install aws cli:
```sh
brew install awscli
```

Install awslocal:
```sh
python3 -m pip install awscli-local
```

Create a bucket:
```shell
aws --endpoint-url=http://localhost:4566 s3 mb s3://demo-bucket
awslocal s3api create-bucket --bucket demo-bucket
```

List buckets:
```shell
awslocal s3api list-buckets
```

Configure acl to readable bucket:
```
aws --endpoint-url=http://localhost:4566 s3api put-bucket-acl --bucket demo-bucket --acl public-read
awslocal s3api put-bucket-acl --bucket demo-bucket --acl public-read
```

### run
```
node test-upload.js
```
