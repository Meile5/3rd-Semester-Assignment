// Header.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import {CartAtom} from '../atoms/CartAtom'
import CartTab from './CartTab'
// @ts-ignore
import logo from '../resources/images/logo.png';

const Header: React.FC = () => {
    const [cartItems] = useAtom(CartAtom);
    const [isCartOpen, setCartOpen] = useState(false);

    const handleMouseEnter = () => {
        setCartOpen(true); 
    };

    const handleMouseLeave = () => {
        setCartOpen(false); 
    };

    // Calculate total quantity directly from cartItems
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <div>
            <header className='flex justify-between items-center h-20 mb-5 p-4 bg-white shadow'>
                <Link to="/" className='flex-grow text-center'>
                    <button className="">
                        <img
                            src={logo}
                            alt="Nordic Paper"
                            className="w-60 h-auto max-h-[60vh] object-cover"
                        />
                    </button>
                </Link>
                <div className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative'
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                >
                    <Link to="/cart" className='flex justify-center items-center'>
                        {/* SVG Icon for Shopping Cart */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3.97716 9.8398C4.06066 8.8007 4.92828 8 5.97073 8H18.0293C19.0717 8 19.9393 8.8007 20.0228 9.8398L20.8264 19.8398C20.9199 21.0038 20.0006 22 18.8328 22H5.16716C3.99943 22 3.08005 21.0038 3.17359 19.8398L3.97716 9.8398Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 11V6C16 3.79086 14.2091 2 12 2V2C9.79086 2 8 3.79086 8 6V11"
                            />
                        </svg>
                        {/* Display total number of items in the cart */}
                        {totalQuantity > 0 && (
                            <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>
              {totalQuantity}
            </span>
                        )}
                    </Link>
                </div>
            </header>
            {/* Render CartTab directly and pass the isOpen state */}
            <div
                onMouseEnter={handleMouseEnter} // Keep cart open when mouse is over the CartTab
                onMouseLeave={handleMouseLeave} // Close cart when mouse leaves the CartTab
            >
                <CartTab isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
            </div>
            
        </div>
    );     
}

export default Header;
