const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');

const io = new Server(server);

app.use(express.static(path.join(__dirname, 'src/public')));


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', message => {
    io.emit('chat message', message);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});