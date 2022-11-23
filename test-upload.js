const fs = require('fs')
const path = require('path')

const uploadFile = require('./aws')

async function main(filename) {
    const filePath = path.resolve(__dirname, filename);
    const fileStream = fs.createReadStream(filePath)

    const now = new Date()
    const newFilename = `test-image-${now.toISOString()}.jpg`

    const result = await uploadFile(fileStream, newFilename);
    console.log(`File ${filename} as sent sucessfully!`, result);
}

main('test-image.jpg')
    .catch(console.error);
