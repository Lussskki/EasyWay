import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'


import registerRoute from './routes/register-route.js'


dotenv.config()


const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: "*", 
    credentials: true, 
} 

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.muavqao.mongodb.net/`

app.use('/register', registerRoute)




mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => {
        console.log("Error", error.message)
        process.exit(1)
    })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})