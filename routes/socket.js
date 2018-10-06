const messageServices = require('../api/services/messages')

module.exports = server => {
  var io = require('socket.io')(server)

  io.on('connection', client => {
    console.log('Client connected...')

    client.on('message', async data => {
      console.log('message receive from client: ', data.content)
      try {
        await messageServices.addMessage(data)
        const messages = await messageServices.getAll()
        io.emit('refreshed messages', messages)
      } catch (error) {
        console.log('Socket connection message: ', error)
      }
    })
  })
}
