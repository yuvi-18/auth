import express from 'express'
import { signupValidation } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/signUp', signupValidation)

export default authRouter;