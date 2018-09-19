var express = require('express');
var app = express();
var fs = require("fs");

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.get('/quiz', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8',(err, data)  => {
        if (err) throw err;
        var obj = JSON.parse(data);
        //var jjj={"response_code":0,"results":[{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"When was Left 4 Dead 2 released?","correct_answer":"November 17, 2009","incorrect_answers":["May 3, 2008","November 30, 2009","June 30, 2010"]}]}
        res.json(obj);
    });
})

var server = app.listen(3002, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})






/*var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: './tmp' });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.single('singleInputFileName'));;

app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/file_upload', function (req, res) {
    console.log(req.files.file.name);
    console.log(req.files.file.path);
    console.log(req.files.file.type);
    var file = __dirname + "/" + req.files.file.name;

    fs.readFile( req.files.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files.file.name
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
*/