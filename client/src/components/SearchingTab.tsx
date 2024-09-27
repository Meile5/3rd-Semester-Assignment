
import React from 'react';
import { useAtom } from 'jotai';
import {useNavigate} from "react-router-dom";
import Filter from './FilterComponent';
import Search from './SearchComponent';
import Sort from './SortComponent';



const SearchingTab: React.FC = () => {
    const navigate = useNavigate();

    const handleOrderHistoryClick = () => {
        // Navigate to order history page
        navigate("/order-history");
    }

    return (
        <div className="grid grid-cols-2 items-center border-4 m-0 p-0">
            {/* Left side: Filter, Search, Sort */}
            <div className="flex space-x-4">
                <Filter/>
                <Search/>
                <Sort/>
            </div>

            {/* Right side: Order History Button */}
            <div className="flex justify-end">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={handleOrderHistoryClick}
                >
                    Order History
                </button>
            </div>
        </div>
    );

}

export default SearchingTab;
