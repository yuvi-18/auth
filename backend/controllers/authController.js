import Joi from 'joi'
import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function signupValidation(req, res) {

    let { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const JoiSchema = Joi.object({
        name: Joi.string().max(100).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(6).required()
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

        const payload = { id: user.id, name: user.name, email: user.email }
        const secret = process.env.JWT_SECRET
        const expiresIn = '30m'

        const token = jwt.sign(payload, secret, { expiresIn })

        // Store the token in an httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,        // can't be accessed by JS
            maxAge: 30 * 60 * 1000 // 30 min in ms
        });

        if (!process.env.JWT_SECRET) {
            res.status(400).json({message: "Jwt sceret not found"})
            process.exit(1);
        }

        res.status(201).json({ message: "signup successful", success: true})

    } catch (err) {
        return res.status(500).json({ message: 'Registration failed. Please try again.', err })
    }

}

export async function loginValidation(req, res) {
    let { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const JoiSchema = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(6).required()
    })
    const { error } = JoiSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: "Bad Request", error })
    }

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User does not exist, Please SignUp!' });
        }

        const isPassValid = await bcrypt.compare(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({ message: "Entered password is wrong" })
        }

        const payload = { id: user.id, name: user.name, email: user.email }
        const secret = process.env.JWT_SECRET
        const expiresIn = '30m'

        const token = jwt.sign(payload, secret, { expiresIn })

        // Store the token in an httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,        // can't be accessed by JS
            maxAge: 30 * 60 * 1000 // 30 min in ms
        });


        // security for production use 
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
        //     sameSite: 'strict', // CSRF protection
        //     maxAge: 30 * 60 * 1000
        // });

        res.status(201).json({ message: "Login successful", success: true})

    } catch (err) {
        return res.status(500).json({ message: 'Login failed. Please try again.', err })
    }
}

export const logoutController = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true
    });


    // same as when setting the cookie, all the properties should be same
    // res.clearCookie('token', {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'strict'
    // });
    res.status(200).json({ message: 'Logged out successfully' });
};
