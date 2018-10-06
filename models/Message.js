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
  }
}, { usePushEach: true })

mongoose.model('Message', MessageSchema)
