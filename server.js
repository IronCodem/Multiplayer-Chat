const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const sockets = require('socket.io');
io = sockets(server);


io.on('connection', function (connection) {
    connection.on('message', function(data) {
        console.log('new message: ' + data);
        io.emit("broadcast", data);
    });
});


server.listen(3000, function() {
  console.log('listening on 3000');
});


//
