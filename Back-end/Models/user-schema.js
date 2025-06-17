import mongoose from 'mongoose'

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
      validator: v => /^.+@.+\..+$/.test(v),
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true
  },
  package: {
    type: String,
    enum: ['PREMIUM', 'ELITE ENTRY', 'BLACK GOLD'],
    required: true
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('Users', userSchema)

export default User
