import {v2 as cloudinary} from "cloudinary"
import Product from "../Models/Product.js"



//api/product/add
export const addProduct = async (req,res) => {
    try {
        let productData =JSON.parse(req.body.productData) 
        const images = req.files
        let imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )
        await Product.create({...productData,imagesURL});
        return res.json({success:true,message:"Product Added"})



    } catch (error) {
        console.log("Product Not Added",error.message);
        res.json({success:false,message:error.message})

    }
}
//api/product/list
export const ProductList = async (req,res) => {
    try {
        const products = await Product.find({});
        res.json({success:true,products})
    } catch (error) {
        console.log("No Product List Found",error.message);
        res.json({sucess:false,message:error.message})
    }
}
//api/product/id
export const productById = async (req,res) => {
    try {
        const { id } = req.body
        
        const product = await Product.findById(id);
        res.json({success:true , message:product})
    } catch (error) {
        console.log("Error,Products by IDs")
         res.json({success:false , message:error.message})
    }
}
//api/product/stock
export const changeStock = async (req,res) => {
    try {
         const { id,inStock } = req.body
         await Product.findByIdAndUpdate(id,{inStock});
         res.json({success:true,message:"Stock Updated"});

    } catch (error) {
        console.log("Error in teh changeStock");
        res.json({success:false,message:error.message})
        
    }
}

