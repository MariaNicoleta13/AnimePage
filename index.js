var express = require('express');
var app = express();
const jsonServer = require('json-server');
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use('/api', router);

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.render('index.html');
});

app.listen(3000, function() {
    console.log('server is runing');
});
