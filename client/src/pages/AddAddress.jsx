import React, { useState } from 'react'
import { assets } from '../assets/assets'
//input field
const Inputfield = ({type,placeholder,name,handleChange,address})=>(
    <input
    className='w-full py-2.5 border border-gray-500/30 rounded outline-none text-gray focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    />
)


const AddAddress = () => {

    const [address,setAddress]  = useState({})
    const OnSubmitHandler = async (e)=>{
    e.preventDefault() // stops the webpage from reloading
}
const handleChange = async (e)=>{
    e.preventDefault() // stops the webpage from reloading
}
  return (
    <div className='mt-16 pb-16'>
        <p
        className='text-2xl md:text-3xl text-gray-500'
        >Add Shipping <span
        className='font-semibold text-primary'
        >Address</span></p>
        <div 
        className='flex flex-col-reverse md:flex-row justify-between mt-10 '
        >
            <div
            className='flex-1 max-w-md'
            >
                <form onSubmit={OnSubmitHandler}
                className='space-y-3 mt-6 text-sm'
                >
                    <div>
                        <Inputfield handleChange={handleChange} address={address} name="firstname" type="text" placeholder={"First Name"}/>
                        <Inputfield handleChange={handleChange} address={address} name="lastname" type="text" placeholder={"Last Name"}/>
                    </div>
                </form>
            </div>
            <img
            className='md:mr-16 mb-16 md:mt-0'
            src={assets.add_address_iamge} alt="" />
        </div>
    </div>
  )
}

export default AddAddress