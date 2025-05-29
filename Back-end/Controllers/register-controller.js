import User from "../Models/user-schema.js"
import bcrypt from 'bcrypt'

import { validationResult } from 'express-validator'

export const registerController = async (req, res) => {
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