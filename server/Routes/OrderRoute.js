import express from 'express';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../Controllers/OrderController.js'
import authUser from './../Middleware/AuthUser';
import authSeller from './../Middleware/AuthSeller';

const orderRouter = express. Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authSeller, getAllOrders)
export default orderRouter