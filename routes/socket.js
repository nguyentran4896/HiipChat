const messageServices = require('../api/services/messages')

module.exports = server => {
  var io = require('socket.io')(server)

  io.on('connection', async client => {
    console.log('Client connected...')
    const messages = await messageServices.getAll()
    io.emit('refreshed messages', messages)

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
