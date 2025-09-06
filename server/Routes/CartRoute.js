import mongoose from "mongoose";
import authUser from "../Middleware/AuthUser.js";
import { updateCart } from "../Controllers/CartController.js";

const cartRouter= mongoose.Router();
cartRouter.post('/update',authUser,updateCart)

export default cartRouter