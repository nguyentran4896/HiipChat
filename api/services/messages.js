const mongoose = require('mongoose')
require('../../models/Message')
const Message = mongoose.model('Message')
const ObjectID = mongoose.Types.ObjectId
const parse = require('../helpers/parse')
const BaseController = require('../helpers/base')

class MessagesService extends BaseController {
  constructor () {
    super(Message)
  }
  getMessages (params = {}) {
    const limit = parse.getNumberIfPositive(params.limit) || 1000
    const offset = parse.getNumberIfPositive(params.offset) || 0

    return this.getAll(offset, limit).then(data => {
      return data.map(message => this.changeProperties(message))
    })
  }

  async getSingleMessage (id) {
    if (!ObjectID.isValid(id)) {
      return Promise.reject('Invalid identifier')
    }
    const message = await this.get(id)
    if (message) return this.changeProperties(message)
    return {}
  }

  async addMessage (data) {
    try {
      const message = this.getValidDocumentForInsert(data)

      const messageCreated = await this.create(message)
      const newMessageId = messageCreated._id.toString()
      const newMessage = await this.getSingleMessage(newMessageId)
      return newMessage
    } catch (error) {
      console.log('addMessage', error)
    }
  }

  async deleteMessage (messageId) {
    if (!ObjectID.isValid(messageId)) {
      return Promise.reject('Invalid identifier')
    }

    await this.delete(messageId)
  }

  getValidDocumentForInsert (data) {
    const message = {
      created: new Date(),
      updated: null
    }

    message.userCreated = parse.getObjectIDIfValid(data.userCreated)
    message.content = parse.getString(data.content)

    return message
  }

  getValidDocumentForUpdate (id, data) {
    if (Object.keys(data).length === 0) {
      return new Error('Required fields are missing')
    }

    const message = {
      updated: new Date()
    }

    if (data.content !== undefined) {
      message.content = parse.getString(data.content)
    }

    return message
  }

  changeProperties (message) {
    if (message) {
      message = JSON.parse(JSON.stringify(message))
      message.id = message._id.toString()
      delete message._id
      delete message.__v
    }

    return message
  }
}

module.exports = new MessagesService()
