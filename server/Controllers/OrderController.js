
import Product from './../Models/Product.js';
import Order from './../Models/Order.js';
// COD : api/order/cod

export const placeOrderCOD = async (req,res) => {
    try {
            const {userId,items,address}=req.body;
            if(!address || items.length === 0){
                return res.json({success:false,message:"Invalid Data order"});

            }
            //calculate amount using items,
            let amount = await items.reduce(async (acc,item) => {
                const product = await Product.findById(item.product);
                return( await acc) + product.offerPrice * item.quantity;
            },0)
            //add Tax Charge
            amount+=Math.floor(amount * 0.02);
            await Order.create({userId,items,amount,address,paymentType:"COD",})
   
   res.json({success:true,message:"Order Placed Successfully"});
        } catch (error) {
        console.log("error in order Controller");
        res.json({success:false,message:error.message})
        
    }
}

/// api/order/user
export const getUserOrders = async (req,res) => {
    try {
        const {userId}= req.query;
        const orders = await Order.find({userId,
            $or : [{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1})
    res.json({success:true,orders});
    
    } catch (error) {
        console.log("error in getuser order");
        res.json({success:false,message:error.message})
    }
}

// Get All Orders for seller /api/order/seller

export const getAllOrders = async (req,res) => {
    try {
    



        const orders = await Order.find({
            $or : [{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1})
    res.json({success:true,orders});
    




    } catch (error) {
        console.log("error in getuser seller order");
        res.json({success:false,message:error.message})
    }
}











