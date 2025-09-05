/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const SellerLogin = () => {
    const {isSeller,setisSeller,navigate} = useAppContext();
    const [email,SetEmail] = useState("");
    const [Password,SetPassowrd] = useState("");
    const OnSubmitHandler = async () => {
        
    }
    useEffect(()=>{
        if(isSeller){
            navigate("/seller");
        }
    },[])
  return !isSeller &&(
    <form onSubmit={OnSubmitHandler}
    className='min-h-screen flex items-center text-sm text-gray-600'
    >
        <div
        className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-500'
        >
            <p
            className='text-2xl font-medium m-auto'
            >Seller <span className='text-primary'>Login</span></p>
            <div>
                <p>Email</p>
                <input
                onChange={(e)=>SetEmail(e.target.value)} value={email}
                type="email" placeholder='Enter Your Email'
                className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
               required
               />
            </div>
            <div className='w-full' >
                <p>Password</p>
                <input 
                onChange={(e)=>SetPassowrd(e.target.value)} value={Password}

                type="password" placeholder='Enter the Password'
                className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
               required
               />
            </div>
            <button 
            className='bg-primary text-white w-full py-2 mt-1 rounded-md cursor-pointer'
           >Login</button>
        </div>
    </form>
  )
}

export default SellerLogin