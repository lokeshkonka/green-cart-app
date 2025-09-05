import express from 'express'
import { register,LoginUser } from '../Controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/register',register)
userRouter.post('/login',LoginUser)

export default userRouter