import express from 'express'
import { body } from 'express-validator'
import { addPartner } from '../Controllers/partners-controller.js'

const addPartnerRouter = express.Router()

addPartnerRouter.post(
  '/add',
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),
    body('contactEmail')
      .notEmpty()
      .withMessage('Contact email is required'),
    body('address').custom(value => {
      if (
        !value ||
        typeof value !== 'object' ||
        !value.street?.trim() ||
        !value.city?.trim() ||
        !value.state?.trim() ||
        !value.postalCode?.trim()
      ) {
        throw new Error('All address fields are required and cannot be empty')
      }
      return true
    })
  ],
  addPartner
)

export default addPartnerRouter
