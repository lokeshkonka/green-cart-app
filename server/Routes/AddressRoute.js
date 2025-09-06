import express from 'express'
import authUser from './../Middleware/AuthUser.js';
import { addAddress, getAddress } from '../Controllers/AddressController.js';

const addressRouter = express.Router();
addressRouter.post('/add',authUser,addAddress);
addressRouter.get('/add',authUser,getAddress);

export default addressRouter
