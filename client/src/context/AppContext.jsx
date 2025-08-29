
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const   AppContext = createContext();

export const AppContextProvider = ({children})=>{


    const currency = import.meta.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user,setUser]= useState(null)
    const [isSeller,setSeller]= useState(false)
    const [showUserLogin,setShowUserLogin]= useState(false)
   const [products,setProducts] = useState([]);
   const [cartItems,setCartItems] = useState({});












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
   useEffect( () => {
    fetchProducts()
   },[])
    const value={cartItems,removeFromCart,updateCartItem,addToCart,navigate,user,setSeller,setUser,isSeller,showUserLogin,setShowUserLogin,products,currency}
   
   
   
   return<AppContext.Provider  value={value}>
        {children}
    </AppContext.Provider>
}
export const useAppContext = ()=>{
    return useContext(AppContext)
}
