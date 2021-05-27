const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
    console.log('We have a new connection!!!');

     socket.on('join', ({ name, room }, callback) => {
         console.log(name, room);
     });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));