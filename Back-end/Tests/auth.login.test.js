import request from 'supertest'
import express from 'express'
import { loginRouter } from '../Routes/auth-route.js'

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

app.use('/login', loginRouter)

describe('User Login', () => {
    const testUser = {
        email: 'testuser123@example.com',
        password: 'password123',
    }

    // login
    it('should login user with same credentials', async () => {
    const res = await request(app).post('/login').send({
      email: testUser.email,
      password: testUser.password
    })
    console.log(res.body)
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe('Login successful')
  })
})