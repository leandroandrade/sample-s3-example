const AWS = require('aws-sdk')

const s3client = new AWS.S3({
    /**
     * If credential are configured using aws configure, credentials object is not necessary.
     */
    // credentials: {
    //     accessKeyId: 'fakeAccessKeyId',
    //     secretAccessKey: 'fakeSecretAccessKey',
    // },
    /**
     * When working locally, we'll use the Localstack endpoints. This is the one for S3.
     * A full list of endpoints for each service can be found in the Localstack docs.
     */
    endpoint: 'http://127.0.0.1:4566',
    /**
     * Including this option gets localstack to more closely match the defaults for
     * live S3. If you omit this, you will need to add the bucketName to the `Key`
     * property in the upload function below.
     *
     * see: https://github.com/localstack/localstack/issues/1180
     */
    s3ForcePathStyle: true,
})


async function uploadFile(data, fileName) {
    return new Promise((resolve, reject) => {
        s3client.upload(
            {
                Bucket: 'demo-bucket',
                Key: fileName,
                Body: data,
            },
            (err, response) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response)
                }
            },
        )
    })
}

module.exports = uploadFile
