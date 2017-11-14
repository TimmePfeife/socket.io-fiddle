
const socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect', onConnect);

function onConnect(){
  console.log('connect ' + socket.id);
}

// receive event, where emitter doesn't get answer
socket.on('answer_error', (data) => {
  console.log(data);
});

// receive event, where emitter gets answer
socket.on('answer_working', (data) => {
  console.log(data);
});