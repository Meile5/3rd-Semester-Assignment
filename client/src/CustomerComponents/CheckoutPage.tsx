import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { CartAtom } from '../atoms/CartAtom.tsx';
import { LoggedCustomerAtom } from '../atoms/LoggedCustomerAtom.tsx';
import CartTabBase from './CartTabBase.tsx';
import {http} from "../http.ts";
import { CreateOrderDto} from '../Api.ts'
import { OrderHistoryAtom } from '../atoms/OrderHistoryAtom.tsx';
import toast, {Toaster} from "react-hot-toast";
import {useNavigate} from 'react-router-dom';



const CheckoutPage = () => {
    const [loggedCustomer, setLoggedCustomer] = useAtom(LoggedCustomerAtom);
    const [cartItems, setCartItems] = useAtom(CartAtom);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [History, setHistory] = useAtom(OrderHistoryAtom);

    const navigate = useNavigate();

    // Dynamically updating the corresponding field in the atom
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'deliveryDate') {

            setDeliveryDate(value);
        } else {
            setLoggedCustomer({
                ...loggedCustomer,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData: CreateOrderDto = {
            customerId: loggedCustomer.id,
            deliveryDate: deliveryDate,
            totalAmount: total_amount,
            orderEntries: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            })),

        };

        try {

            const response = await http.api.paperCreateOrder(orderData);
            console.log("API Response:", response);
            if (response && response.data) {
                setHistory((prevHistory) => [...prevHistory, response.data]);
                setCartItems([]);
                toast.success('Thank you for ordering');
                setTimeout(() => {
                    navigate("/papers");
                }, 1000);
            }

        } catch (error) {
            console.error('Error submitting order:', error);
            toast.error('Failed to process the order. Please try again.');
        }
    };
    const total_amount = cartItems.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
    return (
        <div className="flex  h-[calc(100vh-144px)] ">
            <Toaster position="top-center" />
            <form onSubmit={handleSubmit} className="flex w-full">
                {/* CustomerComponents Information Section */}
                <div className="flex flex-col items-center w-1/2">
                    <div className="p-6 w-full ml-60 max-w-md mt-2">
                        <h1 className="text-2xl font-bold mb-11">Checkout</h1>
                        <h2 className="text-xl font-semibold mb-8">Shipping Information</h2>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="name">
                                Full name
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={loggedCustomer.name}
                                onChange={handleChange}
                                className="border p-2 w-60 rounded-lg bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2 "
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="address">
                                Address
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={loggedCustomer.address}
                                onChange={handleChange}
                                className="border p-2 w-60 rounded-lg bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="phone">
                                Phone number
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={loggedCustomer.phone}
                                onChange={handleChange}
                                className="border p-2 w-60 rounded-lg bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2" htmlFor="email">
                                Email address
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={loggedCustomer.email}
                                onChange={handleChange}
                                className="border p-2 w-60 rounded-lg bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2" htmlFor="deliveryDate">
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
                                    value={deliveryDate}
                                    onChange={handleChange}
                                    className="border p-2 w-58 rounded-lg bg-gray-100 text-gray-700 border-gray-300 focus:outline-none focus:ring-2 "
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="flex flex-col items-center w-1/2">
                    <div className="p-6 w-full mr-12 max-w-md mt-20 bg-[#e4e4e7] rounded-lg flex flex-col space-y-4">
                        <p className="text-xl font-semibold">
                            Order summary
                        </p>
                        <CartTabBase/>
                        <button
                            className="w-full bg-black text-white py-2 rounded-none border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-300 text-center"
                            type="submit"
                        >
                            Submit Order

                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
