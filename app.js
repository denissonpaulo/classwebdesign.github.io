'use strict'

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.status(201);
    if (req.accepts('text')) {
        res.write('name; email\n')
        res.write('Seu Nome; seuemail@dominio.com\n');
        res.end();
    } else {
        res.json({ 'name': 'Seu Nome', 'email': 'seuemail@dominio.com'});
    }
});

var server = app.listen(3000, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log('Exemple app listening at http://%s:%s', host, port); 
});