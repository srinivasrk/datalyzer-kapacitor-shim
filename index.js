let reqData = require('./getFromKapacitor.js')
let express = require('express')
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json())

app.all('/', function(req, res){
  res.status(200).send('Datalyzer-Kapacitor-Shim')
})
app.all('/getGaps', function(req, res) {
  //here get the header / query params for the request which has generator, meaasurement and datarange
  reqData.getFromKapacitor().then((response) => {
    console.log(response)
    res.send(response)
    res.end()
  })
})

app.listen(3322)
console.log('Server running on 3322')
