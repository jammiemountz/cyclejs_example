var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs')

/**
 * Create Express server.
 */
var app = express();

app.set('port', process.env.PORT || 1234);

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + req.url));
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});