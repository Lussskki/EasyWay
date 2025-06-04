import { Partner } from '../Models/partner-schema.js'
import { validationResult } from 'express-validator'

export const addPartner = async (req,res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, contactEmail, address } = req.body
        const newPartner =new Partner({
            name,
            contactEmail,
            address
        }) 
        
        await newPartner.save()
        res.status(201).json({ message: 'Partner created successfully', partner: newPartner})
    } catch(error){
        console.log(error)
        res.status(500).json({ message: 'Server error', error})
    }

}