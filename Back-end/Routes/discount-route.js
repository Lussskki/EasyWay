import express from 'express'

import { body, param } from 'express-validator'
import { createDiscount } from '../Controllers/discount-controller.js'
import { getAllDiscounts }from '../Controllers/discount-controller.js'
import { updateDiscount } from '../Controllers/discount-controller.js'
import { deleteDiscount }from '../Controllers/discount-controller.js'

// create
const createDiscountRouter = express.Router()
createDiscountRouter.post(
    '/create',
    [
        body('code').notEmpty().withMessage('Discount code is required'),
        body('percentage').isFloat({ min: 0, max: 100 }).withMessage('Percentage must be between 0 and 100'),
        body('expiryDate').isISO8601().withMessage('Expiry date must be a valid date'),
    ],
    createDiscount
) 

// get
const getDiscountRouter = express.Router()
getDiscountRouter.post('/showAll', getAllDiscounts)

// upt
const updateDiscountRouter = express.Router()
updateDiscountRouter.put('/update/:id',
    [
        param('id').isMongoId().withMessage('Discount id is required')
    ],
    updateDiscount
)

// del
const deleteDiscountRouter = express.Router()
deleteDiscountRouter.delete(
    '/delete/:id',
    [
        param('id').isMongoId().withMessage('Invalid discount ID'),
    ],
    deleteDiscount
)

export { createDiscountRouter, 
        getDiscountRouter, 
        updateDiscountRouter, 
        deleteDiscountRouter }