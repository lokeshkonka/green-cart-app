//add Address /api/address/add

import Address from "../Models/Address.js";

export const addAddress = async (req,res) => {
    try {
        const {address,userId} = req.body;
        await Address.create({...address,userId})
        res.json({success:true,message:"Address added Succesfully"})
    } catch (error) {
        console.log("error in teh add address");
        res.json({success:false,message:error.message})
    }
}
// Get Address: /api/address/get

export const getAddress = async (req,res) => {
    try {
         const {userId} = req.body;

         const addresses = await Address.find({userId})
        res.json({success:true,addresses})
    } catch (error) {
        console.log("Error in the Get Address");
        res.json({success:false,message:error.message})
    }
}