module.exports = function (server) {
  var io = require('socket.io')(server)

  io.on('connection', function (client) {
    console.log('Client connected...')

    client.on('message', function (data) {
      console.log('message receive from client: ', data)
    })
  })
}
