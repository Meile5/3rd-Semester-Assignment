// Header.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
// @ts-ignore
import logo from '../resources/images/logo.png';

const Header: React.FC = () => {
   
    return (
        <header className='flex justify-between items-center mb-5 p-4 bg-white shadow'>
            <Link to="/" className='flex-grow text-center'>
                <button className="">
                    <img
                        src={logo}
                        alt="Nordic Paper"
                        className="w-60 h-auto max-h-[60vh] object-cover" // Adjust width and max height as needed
                    />
                </button>
            </Link>
            <div className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative'>
            <Link to="/cart" className='flex justify-center items-center'>
                    {/* SVG Icon for Shopping Cart */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18l-1.5 9H6.5L5 3zM3 6h16l-1 6H4L3 6zm3 12a2 2 0 100 4 2 2 0 000-4zm12 0a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                   
                </Link>
            </div>
        </header>
    );
}

export default Header;
