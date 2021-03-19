# S3 localstack

Example using upload image to S3 bucket in localhost with [Localstack](https://github.com/localstack/localstack)

## Configurations:

### disclaimer
19/03/2021 - localstack ports was unified to use localhost:4566

### URL services
* url service: http://localhost:8055/
* url s3: http://localhost:4566/
* status localstack: http://localhost:4566/

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

### create a bucket
```
aws --endpoint-url=http://localhost:4566 s3 mb s3://demo-bucket
```

### configure acl to readable bucket
```
aws --endpoint-url=http://localhost:4566 s3api put-bucket-acl --bucket demo-bucket --acl public-read
```

### run
```
node test-upload.js
```

### References
* https://dev.to/goodidea/how-to-fake-aws-locally-with-localstack-27me
* https://github.com/good-idea/localstack-demo
* https://medium.com/@gusiol/desenvolvimento-na-aws-s3-e-sqs-sem-custos-com-localstack-f525d015ca48
* https://github.com/guizoxxv/localstack-test
