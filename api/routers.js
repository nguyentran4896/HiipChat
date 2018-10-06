const express = require('express')
const usersRoute = require('./routes/users')
const messagesRoute = require('./routes/messages')

const apiRouter = express.Router()

new usersRoute(apiRouter)
new messagesRoute(apiRouter)

module.exports = apiRouter
