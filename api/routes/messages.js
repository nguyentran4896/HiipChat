const MessagesService = require('../services/messages')

class MessagesRoute {
  constructor (router) {
    this.router = router
    this.registerRoutes()
  }

  registerRoutes () {
    this.router.get(
      '/v1/messages',
      this.getMessages.bind(this)
    )
    this.router.post(
      '/v1/messages',
      this.addMessage.bind(this)
    )
    this.router.get(
      '/v1/messages/:id',
      this.getSingleMessage.bind(this)
    )
    this.router.put(
      '/v1/messages/:id',
      this.updateMessage.bind(this)
    )
    this.router.delete(
      '/v1/messages/:id',
      this.deleteMessage.bind(this)
    )
  }

  getMessages (req, res, next) {
    MessagesService.getMessages(req.query)
      .then(data => {
        res.send(data)
      })
      .catch(next)
  }

  getSingleMessage (req, res, next) {
    MessagesService.getSingleMessage(req.params.id)
      .then(data => {
        if (data) {
          res.send(data)
        } else {
          res.status(404).end()
        }
      })
      .catch(next)
  }

  addMessage (req, res, next) {
    MessagesService.addMessage(req.body)
      .then(data => {
        res.send(data)
      })
      .catch(next)
  }

  updateMessage (req, res, next) {
    MessagesService.updateMessage(req.params.id, req.body)
      .then(data => {
        if (data) {
          res.send(data)
        } else {
          res.status(404).end()
        }
      })
      .catch(next)
  }

  deleteMessage (req, res, next) {
    MessagesService.deleteMessage(req.params.id)
      .then(data => {
        res.status(data ? 200 : 404).end()
      })
      .catch(next)
  }
}

module.exports = MessagesRoute
