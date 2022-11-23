const t = require('tap');
// const upload = require('./aws');
const path = require("path");
const fs = require("fs");
const proxyquire = require('proxyquire');

const {test} = t;

test('should send file to s3', async t => {
    const expectFilename = `test-image-${Date.now()}.jpg`;
    const stream = fs.createReadStream(path.resolve(__dirname, 'test-image.jpg'));

    const expectedOpts = {
        endpoint: 'http://127.0.0.1:4566',
        s3ForcePathStyle: true,
    }
    const expectedParams = {
        Bucket: 'demo-bucket',
        Key: expectFilename,
        Body: stream,
    }

    class S3 {
        constructor(opts) {
            t.same(opts, expectedOpts);
        }

        upload(params, cb) {
            t.same(params, expectedParams);
            cb(null, {key: 'value'})
        }
    }

    const mock = proxyquire('./aws', {
        'aws-sdk': {
            S3
        }
    });
    const result = await mock(stream, expectFilename);
    t.same(result, {key: 'value'});
});

test('should return error from s3', async t => {
    const expectFilename = `test-image-${Date.now()}.jpg`;
    const stream = fs.createReadStream(path.resolve(__dirname, 'test-image.jpg'));

    const expectedOpts = {
        endpoint: 'http://127.0.0.1:4566',
        s3ForcePathStyle: true,
    }
    const expectedParams = {
        Bucket: 'demo-bucket',
        Key: expectFilename,
        Body: stream,
    }

    const mock = proxyquire('./aws', {
        'aws-sdk': {
            S3: class {
                constructor(opts) {
                    t.same(opts, expectedOpts);
                }

                upload(params, cb) {
                    t.same(params, expectedParams);
                    cb(new Error('kaboom'), null)
                }
            }
        }
    });

    t.rejects(mock(stream, expectFilename));
});
