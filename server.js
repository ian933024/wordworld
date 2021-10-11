const express = require('express')
const app = express()
const port = 8000
var fs = require("fs")
var today = new Date();
console.log(today)

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
const { stringify } = require('querystring')

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

var words = {}

function add(add) {
  fs.readFile('./public/dic.json', 'utf-8', (err, data) => {
    words = JSON.parse(data)
    console.log(words)
    words.unshift(add);
    console.log(words);
    let added = JSON.stringify(words)
    fs.writeFile('./public/dic.json', added, function () {
      console.log('輸入成功');
    });
  })
}

fs.readFile('./public/dic.json', 'utf-8', (err, data) => {
  //console.log(data)
  words = JSON.parse(data)
  console.log(17)
  console.log(words[0]["英文"])
})

setTimeout(() => {
  app.post("/", function (req, res) {
    var recieved = req.body
    add(recieved)
    res.send("成功傳送");
  }
  )
}, 2000)