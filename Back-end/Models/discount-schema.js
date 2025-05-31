import mongoose from 'mongoose'

const discountSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  discountPercent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
}, { collection: 'discountList' }) 

export const Discount = mongoose.model('Discount', discountSchema)
