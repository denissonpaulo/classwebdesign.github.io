'use strict'

const net = require('node:net');
const chatServer = net.createServer();
const clientList = [];

let broadcast = function(message, client){
    for(let i = clientList.length - 1; i>=0; i-- ){
        if (client !== clientList[i]) {
            clientList[i].write(message);
        }
    }
};

chatServer.on('connection', function (client) {
    client.write('Hi guest' + '!\n');
    clientList.push(client);
    client.on('data', function(data){
        broadcast(data, client);
    });
    client.on('end', function() {
        console.log('client', clientList.indexOf(client));
        clientList.splice(clientList.indexOf(client, 1));
    });
    client.on('error', function(err){
        console.log(err);
    });
});

chatServer.listen(9000);

//run in console: node chat-tcp.js
//station 1 --> run in terminal: telnet localhost 9000
//station 2 --> run in terminal: telnet localhost 9000
//begin conversation!