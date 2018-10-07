const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  content: {
    type: String,
    default: '',
    required: true
  },
  userCreated: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updated: Date,
  created: Date
}, { usePushEach: true })

mongoose.model('Message', MessageSchema)
