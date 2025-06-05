import User from "../Models/user-schema.js"
import bcrypt from 'bcrypt'

import { validationResult } from 'express-validator'
import { generateAccessToken, generateRefreshToken } from "../Utils/jwt-utils.js"

export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        const { username, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) { return res.status(400).json({ message: 'User already exists' })}
        
        const hashedPassword = await bcrypt.hash(password, 10)   
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save(newUser)
        
        res.status(201).json({ message: 'User registered successfully' })
    }catch(error){
        console.error('Error during registration:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        const { email, password, rememberMe } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'Invalid email or password' })

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' })

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id, rememberMe)

        console.log('Access Token:', accessToken)
        console.log('Refresh Token:', refreshToken)
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
            maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
        })
        
        res.status(200).json({
            message: 'Login successful',
            user: { username: user.username, email: user.email },
            accessToken,
            refreshToken
        })

    } catch (error) {
        console.error('Error during login:', error)
        res.status(500).json({ message: 'Internal server error' })
    }   
} 