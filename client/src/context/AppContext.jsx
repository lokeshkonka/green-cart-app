/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

//after Backend

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, SetsearchQuery] = useState("");


  //fetch Seller 
  const fetchSeller = async () => {
    try {
      const {data} = await axios.get('/api/seller/is-auth');
      if (data.success) {
        setSeller(true)
      }else{
         setSeller(false)
      }
    } catch (e) {
      setSeller(false);
      console.log(e)
    }
  }
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("ADDED TO YOUR CART 😘");
  };

  // Update cart
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("UPDATED 👍");
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("DELETED FROM CART 😭");
  };

  // Cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // Cart amount
  const getcartAmount = () => {
    let totalam = 0;
    for (const item in cartItems) {
      let iteminfo = products.find((product) => product._id === item);
      if (cartItems[item] > 0 && iteminfo) {
        totalam += iteminfo.offerPrice * cartItems[item];
      }
    }
    return Math.floor(totalam * 100) / 100;
  };

  // Persist isSeller in localStorage
  useEffect(() => {
   fetchSeller();
   fetchProducts()
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    axios,
    getCartCount,
    getcartAmount,
    searchQuery,
    SetsearchQuery,
    cartItems,
    removeFromCart,
    updateCartItem,
    addToCart,
    navigate,
    user,
    setSeller,
    setUser,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
