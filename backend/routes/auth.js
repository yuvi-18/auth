import express from 'express'
import { loginValidation, signupValidation } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/signup', signupValidation)
authRouter.post('/login', loginValidation)

export default authRouter;