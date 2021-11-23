const fs = require('fs')
const left_split = 'const awsmobile = '
// To split right in the aws_configure # DANGER do not change right_slit
const right_split =
  `;


export default awsmobile`

// to access aws resource which can not be import due to the different commonjs and ES6
let config_file = fs.readFileSync('./src/aws-exports.js', "utf-8")
let aws_configure = JSON.parse(config_file.split(left_split,)[1].split(right_split)[0])

exports.aws_configure = aws_configure