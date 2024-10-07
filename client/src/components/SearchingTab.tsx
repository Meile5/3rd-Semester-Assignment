
import React from 'react';
import { useAtom } from 'jotai';
import {useNavigate} from "react-router-dom";
import Filter from './FilterComponent';
import Search from './../sharedComponents/SearchComponent.tsx';
import Sort from './SortComponent';



const SearchingTab: React.FC = () => {
    return (
        <div className="grid grid-cols-2 items-center border-4 m-0 p-0">
            {/* Left side: Filter, Search, Sort */}
            <div className="flex space-x-4">
                <Filter/>
                <Search/>
                <Sort/>
            </div>

            {/* Right side: Order History and Back buttons */}
            <div className="flex space-x-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded"
                > Order History
                </button>
            </div>
        </div>
    );

}

export default SearchingTab;
