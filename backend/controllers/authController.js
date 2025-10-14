import Joi from 'joi'
import userModel from '../models/user.js'
import bcrypt from 'bcrypt'

export async function signupValidation(req, res) {

    let { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const JoiSchema = Joi.object({
        name: Joi.string().max(100).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(6).max(20).required()
    })
    const { error } = JoiSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: "Bad Request", error })
    }

    try {
        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new userModel({ name, email, password })
        user.password = await bcrypt.hash(password, 10)

        await user.save()
        res.status(201).json({ message: "signup successful", success: true })



    } catch (err) {
        res.status(500).json({ message: 'Registration failed. Please try again.', err })
    }

}