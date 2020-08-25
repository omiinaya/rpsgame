//constants
const port = 3000;

//dependencies
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

//file serving
const app = express();
const clientPath = "${__dirname}/../client";
app.use(express.static(clientPath));

//creating io socket server
const server = http.createServer(app);
const io = socketio(server);

//initializing matchmaking
let waitingPlayer = null;

//when someone connects...
io.on('connection', (socket) => {

    //alerts the user he is connected.
    socket.emit('message', 'Connection has been established.');

    if (waitingPlayer) {
        //start

        [socket, waitingPlayer].forEach(s => {
            s.emit('message', 'Match started!');
        });

        waitingPlayer = null;

    } else {

        waitingPlayer = socket;
        waitingPlayer.emit('message', 'Waiting for an opponent');
    }
    //io relays message to everyone else in chat.
    socket.on('message', (text) => {
        io.emit('message', text);
    });
});

//error logging
server.on('error', (err) => {
    console.log('Server error: ', err);
});

//listener
server.listen(port, () => {
    console.log('Server started on '+port);
});
