const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');

const io = new Server(server);

app.use(express.static(path.join(__dirname, 'src/public')));

function getActiveRooms() {

  const arr = Array.from(io.sockets.adapter.rooms);

  const filtered = arr.filter(room => !room[1].has(room[0]))
  // creator and createdAt need to be persisted somehow

  const res = filtered.map(i => ({ roomName: i[0], occupants: i[1].size }));
  return res;
}

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // inform connected user of existing rooms
  socket.emit('existing rooms', getActiveRooms())

  socket.on('add room', roomDetails => {
    socket.join(roomDetails.roomName);
    socket.broadcast.emit('add room', roomDetails);
  });

  socket.on('join room', userJoined => {
    socket.join(userJoined.roomName);
    socket.to(userJoined.roomName).emit('new user', `${userJoined.username} has entered the chatroom.` )
  })

  socket.on('chat message', chatObject => {
    io.to(chatObject.roomName).emit('chat message', chatObject.message);
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});