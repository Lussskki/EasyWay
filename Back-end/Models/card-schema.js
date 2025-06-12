import mongoose from 'mongoose'

const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true
  },
  cvv: {
    type: Number,
    required: true
  }
}) 


const Card = mongoose.model('Card', cardSchema)
export default Card


