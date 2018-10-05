
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const fs = require('fs')
const path = require('path')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
}, (error) => {
  if (error) {
    console.log('Can not connect to DB: ', error)
    return
  }
  console.log('Connected to MongoDB')
})

const MODEL_PATH = path.join(__dirname, '/../models')

fs.readdirSync(MODEL_PATH).forEach((file) => {
  var filePath = path.join(MODEL_PATH, file)
  require(filePath)
})
