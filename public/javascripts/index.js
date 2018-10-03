var socket = io()
socket.on('connect', function (data) {
  console.log('connected')
  socket.emit('join', 'Hello World from client')
})
