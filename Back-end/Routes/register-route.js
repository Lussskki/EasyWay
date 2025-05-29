import express from 'express'

import {registerController} from '../Controllers/register-controller.js'

const registerRouter = express.Router()

registerRouter.post('/', registerController)

export default registerRouter