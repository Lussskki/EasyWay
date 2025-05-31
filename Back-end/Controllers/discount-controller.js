import { Discount } from "../Models/discount-schema.js"
import { validationResult } from 'express-validator';

export const createDiscount = async (req, res) => {
    try {
        const { companyName, telephone, discountPercent } = req.body;

        
        if (!companyName || !telephone || discountPercent === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        
        const newDiscount = new Discount({
            companyName,
            telephone,
            discountPercent
        });

        await newDiscount.save();
        res.status(201).json({ message: 'Discount created successfully', discount: newDiscount });
    } catch (error) {
        console.error('Error creating discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.find();
        res.status(200).json(discounts);
    } catch (error) {
        console.error('Error fetching discounts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteDiscount = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting discount with ID:', id);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        if (!id) {
            return res.status(400).json({ message: 'Discount ID is required' });
        }

        const discount = await Discount.findByIdAndDelete(id);
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        res.status(200).json({ message: 'Discount deleted successfully' });
    } catch (error) {
        console.error('Error deleting discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}   