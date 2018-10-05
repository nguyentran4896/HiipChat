const express = require('express')
const usersRoute = require('./routes/users')

const apiRouter = express.Router()

new usersRoute(apiRouter)

module.exports = apiRouter
