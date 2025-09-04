import React, { useState } from 'react'
import { assets } from '../assets/assets'
//input field
const Inputfield = ({type,placeholder,name,handleChange,address})=>(
    <input
    className='w-full py-3.5 border border-gray-500/30 rounded outline-none text-gray focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    />
)


const AddAddress = () => {

    const [address,setAddress]  = useState({
        firstName : '',
        lastName : '',
        email : '',
        street : '',
        city : '',
        state : '',
        zipcode : '',
        country : '',
        phone : '',
    })

    const OnSubmitHandler = async (e)=>{
    e.preventDefault() // stops the webpage from reloading
}
const handleChange =  (e)=>{
   const {name,value}= e.target; // stops the webpage from reloading
   setAddress((prevAddress)=>({
    ...prevAddress,
    [name]:value
   }))

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
                    <div className='grid grid-cols-2 gap-4' >
                        <Inputfield handleChange={handleChange} address={address} name="firstname" type="text" placeholder={"First Name"}/>
                        <Inputfield handleChange={handleChange} address={address} name="lastname" type="text" placeholder={"Last Name"}/>
                    </div>
                        <Inputfield handleChange={handleChange} address={address} name="email" type="email" placeholder={"Email Address"}/>
                        <Inputfield handleChange={handleChange} address={address} name="street" type="text" placeholder={"Street"}/>
                    <div className='grid grid-cols-2 gap-4'>
                        <Inputfield handleChange={handleChange} address={address} name="city" type="text" placeholder={"City"}/>
                        <Inputfield handleChange={handleChange} address={address} name="state" type="text" placeholder={"State"}/>                                                                                          
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <Inputfield handleChange={handleChange} address={address} name="zipcode" type="text" placeholder={"Zipcode"}/>
                        <Inputfield handleChange={handleChange} address={address} name="country" type="text" placeholder={"Country"}/>                                                                                          
                    </div>
                        <Inputfield handleChange={handleChange} address={address} name="phone" type="text" placeholder={"Phone"}/>                                                                                          
                        <button
                        className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'
                        onClick={()=>{}}
                        >
                            Save Address
                        </button>
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