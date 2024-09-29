import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { CartAtom } from '../atoms/CartAtom';
import CartTab from './CartTab';
import CartTabBase from './CartTabBase';

const CheckoutPage = () => {
    const [cartItems] = useAtom(CartAtom);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        deliveryDate: ""
    });
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCustomerInfo({
            ...customerInfo,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    };

    return (
        <div className="flex h-screen  h-[calc(100vh-100px)] "> 

            {/* Customer Information Section */}
            <div className="flex flex-col items-center w-1/2  "> 
                <div className=" p-6 w-full ml-60 max-w-md mt-2  ">
                    <h1 className="text-2xl font-bold mb-11 ">Checkout</h1>
                    <h2 className="text-xl font-semibold mb-8 ">Shipping Information</h2>
                    <form onSubmit={handleSubmit} className="w-full"> 
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="name">
                                Full name
                                <span className="text-red-500">*</span> 
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleChange}
                                className="border p-2 w-60 rounded-lg bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2 "
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="address">
                                Address
                                <span className="text-red-500">*</span> {/* Red asterisk for required fields */}
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={customerInfo.address}
                                onChange={handleChange}
                                className="border p-2 w-60 rounded-lg bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="phone">
                                Phone number
                                <span className="text-red-500">*</span> {/* Red asterisk for required fields */}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={customerInfo.phone}
                                onChange={handleChange}
                                className="border p-2 w-60 rounded-lg bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2" htmlFor="email">
                                Email dddress
                                <span className="text-red-500">*</span> {/* Red asterisk for required fields */}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={customerInfo.email}
                                onChange={handleChange}
                                className="border p-2 w-60 rounded-lg bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2" htmlFor="email">
                                Delivery date
                                <span className="text-red-500">*</span> 
                            </label>
                            <div className="flex items-center">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24" 
                                    height="24" 
                                    fill="#0077b6" 
                                    viewBox="0 0 32 32" 
                                    className="mr-2" 
                                >
                                    <rect x="4" y="16" width="12" height="2"/>
                                    <rect x="2" y="11" width="10" height="2"/>
                                    <path
                                        d="M29.9189,16.6064l-3-7A.9985.9985,0,0,0,26,9H23V7a1,1,0,0,0-1-1H6V8H21V20.5562A3.9924,3.9924,0,0,0,19.1421,23H12.8579a4,4,0,1,0,0,2h6.2842a3.9806,3.9806,0,0,0,7.7158,0H29a1,1,0,0,0,1-1V17A.9965.9965,0,0,0,29.9189,16.6064ZM9,26a2,2,0,1,1,2-2A2.0023,2.0023,0,0,1,9,26ZM23,11h2.3408l2.1431,5H23Zm0,15a2,2,0,1,1,2-2A2.0023,2.0023,0,0,1,23,26Zm5-3H26.8579A3.9954,3.9954,0,0,0,23,20V18h5Z"/>
                                </svg>
                                <input
                                    type="date"
                                    id="deliveryDate"
                                    name="deliveryDate"
                                    value={customerInfo.deliveryDate}
                                    onChange={handleChange}
                                    className="border p-2 w-58 rounded-lg bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2 " 
                                />
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            {/* Order Summary Section */}
            <div className="flex flex-col items-center w-1/2"> {/* Right side with its own padding */}

                <div className="p-6 w-full mr-12 max-w-md mt-20 bg-[#e4e4e7] rounded-lg flex flex-col space-y-4"> 
                    <p className="text-xl font-semibold">
                        Order summary
                    </p>
                    <CartTabBase
                    />
                    <button type="submit" className="w-full bg-black text-white py-2 rounded-none border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-300 text-center">Submit Order</button>
                </div>
            </div>
        </div>
    );

}
export default CheckoutPage;
