import mongoose from 'mongoose'
import cardSchema from '../Models/card-schema.js'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^.+@.+\..+$/.test(v)
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true
  },
  cardId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    cardSchema
  }], 
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('Users', userSchema)

export default User

