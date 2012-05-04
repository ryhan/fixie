var fs = require('fs'),
    express = require('express'),
    app = express.createServer();


app.use(express.bodyParser());
app.listen(process.env.PORT || 1235);


app.get('/', function(req, res) {
    res.sendfile(__dirname + '/sample.html');
});
app.get('/*', function(req, res) {
    res.sendfile(__dirname + req.url);
});



