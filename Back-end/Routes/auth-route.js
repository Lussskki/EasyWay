import express from 'express'

import { body } from 'express-validator'
import { registerUser } from '../Controllers/auth-controller.js'
import { loginUser } from '../Controllers/auth-controller.js'


const registerRouter = express.Router()

registerRouter.post(
    '/',
    [
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
     registerUser)

const loginRouter = express.Router()

loginRouter.post(
    '/',
    [
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
     loginUser)

export { registerRouter, loginRouter }     