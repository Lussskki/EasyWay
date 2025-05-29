import express from 'express'

import { body } from 'express-validator'
import {registerController} from '../Controllers/register-controller.js'

const registerRouter = express.Router()

registerRouter.post(
    '/',
    [
        body('username').isLength({ min: 10 }).withMessage('Username must be at least 10 characters long'),
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
     registerController)

export default registerRouter