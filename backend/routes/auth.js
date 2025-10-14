import express from 'express'
import rateLimit from 'express-rate-limit';
import { loginValidation, logoutController, signupValidation } from '../controllers/authController.js'

const authRouter = express.Router()

// limiter 5 req every 10 min
const authLimiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many attempts, please try again later'
});

authRouter.post('/login', authLimiter, loginValidation);
authRouter.post('/signup', authLimiter, signupValidation);

authRouter.post('/signup', signupValidation)
authRouter.post('/login', loginValidation)
authRouter.post('/logout', logoutController)

export default authRouter;