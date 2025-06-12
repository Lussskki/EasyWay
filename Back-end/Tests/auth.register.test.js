import request from 'supertest'
import express from 'express'
import { registerRouter } from '../Routes/auth-route.js'

import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
  await mongoose.disconnect()
})

const app = express()
app.use(express.json())
app.use('/register', registerRouter)


describe('User Registration and Login', () => {
  const testUser = {
    "username": "john_d",
    "email": "john2@example.com",
    "password": "securePassword123",
    "cards": [
      {
        "cardNumber": "5111111111111111",
        "expiryDate": "13/16",
        "cvv": "123"
      },
      {
        "cardNumber": "5502400000000004",
        "expiryDate": "10/37",
        "cvv": "456"
      }
    ]
  }

  // register
  it('should register user with valid data', async () => {
    const res = await request(app).post('/register').send(testUser)
    console.log(res.body)

    expect(res.statusCode).toBe(201)
    expect(res.body.message).toBe('User registered successfully')
  })
})


