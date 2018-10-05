const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: true,
    unique: true
  },
  created: Date,
  updated: Date
}, { usePushEach: true })

mongoose.model('User', UserSchema)
