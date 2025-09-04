
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const   AppContext = createContext();

export const AppContextProvider = ({children})=>{


    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user,setUser]= useState(null)
    const [isSeller,setSeller]= useState(false)
    const [showUserLogin,setShowUserLogin]= useState(false)
   const [products,setProducts] = useState([]);
   const [cartItems,setCartItems] = useState({});
   const [searchQuery,SetsearchQuery] = useState({});











   const fetchProducts  = async () => {
    setProducts(dummyProducts);
   }

   //Add Procts

   const addToCart  = (itemId)=>{
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
        cartData[itemId] += 1;

    }else{
        cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("ADDED TO UR CART 😘")
   }



   //update Cart Items
   const updateCartItem =  (itemId,quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("BOI UPDATED 👍")
   }
   //remove products
   const removeFromCart = (itemId)=>{
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
        cartData[itemId]-=1;
        if (cartData[itemId]===0) {
            delete cartData[itemId];


        }
    }
    setCartItems(cartData)
    toast.success("DELEETED FROM CART 😭")
   }

   /// Get the Cart Item Count
   const getCartCount = ()=>{
    let totalCount = 0;
    for(const item in cartItems){
        totalCount += cartItems[item];

    }
    return totalCount
   }
 /// get the cart total amount
 const getcartAmount = ()=>{
    let totalam =0;
    for(const item in cartItems){
        let iteminfo = products.find((product)=> product._id === item);
        if(cartItems[item] >0){
            totalam += iteminfo.offerPrice * cartItems[item]
        }
    }
    return Math.floor(totalam * 100) / 100;
 }
   useEffect( () => {
    fetchProducts()
   },[])
    const value={getCartCount,getcartAmount,searchQuery,SetsearchQuery,cartItems,removeFromCart,updateCartItem,addToCart,navigate,user,setSeller,setUser,isSeller,showUserLogin,setShowUserLogin,products,currency}
   
   
   
   return<AppContext.Provider  value={value}>
        {children}
    </AppContext.Provider>
}
export const useAppContext = ()=>{
    return useContext(AppContext)
}
