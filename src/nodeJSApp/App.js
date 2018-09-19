

const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const mongo = require('./mongoDB')


app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET", "POST", "PUT");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    req.header("Access-Control-Allow-Methods", "GET", "POST", "PUT");
    next();
});

app.get('/get/:item', (req, res) => {//req.params={item:(:item)}

    return mongo.findItem(req.params.item).then(result=>{
        console.log(result,req.params)
        res.json(result)
    });
});
app.get('/', (req, res) => {
    mongo.dropItem("asdasd");
    return mongo.find({}).then(result=>{
        console.log(result)
        res.json(result)
    });
});

app.post('/post', (req, res) => {
    //var user_id = req.body
    var m = req.method;
    var body=req.body;
    console.log( "body:", "method", m,body,body.item)

    mongo.putItem(body.item)
    res.send('Got a PUT request at /user')

});

app.listen(3004, () => console.log('Example app listening on port 3002!'))
