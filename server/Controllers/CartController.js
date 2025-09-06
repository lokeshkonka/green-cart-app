import User from "../Models/User.js"

//update user cart : api/cart/update
export const updateCart =async (req,res) => {
    try {
        const {userId,cartItems } = req.body
        await User.findByIdAndUpdate(userId,{cartItems})

        res.json({success:true,message:"CArt UPdated"})
    } catch (error) {
        console.log("Cart Controller Update error");
        res.json({success:false,message:error.message})
        
        
    }
}
