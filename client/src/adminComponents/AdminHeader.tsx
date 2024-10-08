import React, { useState } from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import Filter from './../sharedComponents/FilterComponent';
import Search from './../sharedComponents/SearchComponent';
import Sort from './../sharedComponents/SortComponent';
import '../resources/styles/Buttons.css';
// @ts-ignore
import logo from '../resources/images/logo.png';

const Header: React.FC = () => {

    const navigate = useNavigate();


    return (
        <div>
            {/* Header Section */}
            <header className="bg-white shadow">
                {/* First Row: Logo */}
                <div className="flex justify-center items-center h-16">
                    <Link to="/" className="text-center">
                        <img
                            src={logo}
                            alt="Nordic Paper"
                            className="w-60 h-auto max-h-[60vh] object-cover"
                        />
                    </Link>
                </div>

                {/* Second Row: Buttons and Components */}
                <div className="flex justify-between items-center h-12 px-4 -mt-8 mb-2">
                    {/* Left Side: Products and Order History */}
                    <div className="flex ml-20 space-x-7 items-center">
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `text-black font-semibold border-b-2 transition-all duration-300 text-center whitespace-nowrap pr-1 pl-1 ${isActive ? 'border-black' : 'border-transparent'}`
                            }
                        >
                            Products
                        </NavLink>
                        <NavLink
                            to="/adminHistory"
                            className={({ isActive }) =>
                                `text-black font-semibold border-b-2 border-transparent hover:border-black transition-all duration-300 text-center whitespace-nowrap pr-1 pl-1 ${isActive ? 'border-black' : 'border-transparent'}`
                            }
                        >
                            Order History
                        </NavLink>
                    </div>

                    {/* Right Side: Filter, Sort, Search */}
                    <div className="flex space-x-2 items-center">
                        <Filter />
                        <Sort />
                        <Search />

                    </div>
                </div>
            </header>

        </div>
    );
};

export default Header;
