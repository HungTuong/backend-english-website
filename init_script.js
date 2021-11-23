const fs = require('fs')
const { S3Client, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
var path = require('path');
const {aws_configure} = require('./aws_config_adapter')

const getContentTable = async (client, bucket) => {
  let data = {}

  await client.send(new ListObjectsCommand({
    Bucket: bucket,
    Prefix: 'public/content/'
  })).then(({ Contents }) => {
    if (Contents == null) {
      console.log('Not Existing Folder Content On sever')
      return
    } else {
      Contents
        .filter(item => item.Key.endsWith('.html'))
        .forEach((e) => {
          data = { ...data, [e['Key']]: e['LastModified'] }
        })
    }
  })

  return data
}

function getObject(client, Bucket, Key) {
  return new Promise(async (resolve, reject) => {
    const getObjectCommand = new GetObjectCommand({
      Bucket,
      Key
    })

    try {
      const response = await client.send(getObjectCommand)
      let responseDataChunks = []

      response.Body.on('data', chunk => responseDataChunks.push(chunk))

      response.Body.once('end', () => resolve([responseDataChunks.join(''), Key]))
    } catch (err) {
      console.log('err')
      return reject(err)
    }
  })
}

(async () => {
  const client = new S3Client({ region: 'ap-southeast-1' })
  const bucket = aws_configure['aws_user_files_s3_bucket']
  try {
    const data = await getContentTable(client, bucket)
    const save_table = fs.existsSync('./FileTable.json') ? JSON.parse(fs.readFileSync('./FileTable.json', 'utf8')) : {}

    // download s3 file
    const requested_object = Object.entries(data)
      .filter(([key, value]) => Date.parse(value) !== Date.parse(save_table[key]))
      .map(([key, _]) => getObject(client, bucket, key))
      .map(promise => promise.then(async ([file, key]) => {
        const file_path = `./${key.split('public/')[1]}`

        return fs
          .promises.mkdir(path.dirname(file_path), { recursive: true })
          .then(x => fs.promises.writeFile(file_path, file))
      }))

    Promise.all(requested_object).then(() =>
      fs.promises.writeFile('./FileTable.json', JSON.stringify(data))
    ).then(() => {
      console.log('Save FileTable');
    })

    // remove missing file 
    // TODO : need to recheck
    Object.entries(save_table)
    .filter(([key, value]) => !(key in data))
    .forEach(([key, _]) => {
      console.log(key);
      fs.unlink(key)
    })


  } catch (err) {
    console.log("Error", err);
  }
})()
