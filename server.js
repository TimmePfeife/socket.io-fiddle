
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

let lobby = [];
let noPlayers = 0;

io.on('connect', (socket) => {
  console.log('connect ' + socket.id);

  lobby.push({
    name: 'Player ' + ++noPlayers,
    id: socket.id,
  });
  
  // send event, where emitter doesn't get answer
  socket.on('trigger_error', (data) => {
    console.log(data);

    for (let i = 0; i < lobby.length; i++) {
      socket.to(lobby[i].id).emit('answer_error', {msg: 'I got no event.'});
    }
  });

  // send event, where emitter gets answer
  socket.on('trigger_working', (data) => {
    console.log(data);

    for (let i = 0; i < lobby.length; i++) {
      if (lobby[i].id === socket.id) {
        socket.emit('answer_working', {msg: 'I got an event.'});
      } else {
        socket.to(lobby[i].id).emit('answer_working', {msg: 'I got an event.'});
      }
    }
  });

  socket.on('disconnect', () => console.log('disconnect ' + socket.id));
});

server.listen(port, () => console.log('server listening on port ' + port));