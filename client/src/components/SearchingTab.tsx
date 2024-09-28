
import React from 'react';
import { useAtom } from 'jotai';
import {useNavigate} from "react-router-dom";
import Filter from './FilterComponent';
import Search from './SearchComponent';
import Sort from './SortComponent';

interface SearchingTabProps {
    showOrderHistory: boolean;
    onShowOrderHistory: () => void;
    onBack: () => void;
}

const SearchingTab: React.FC<SearchingTabProps> = ({ showOrderHistory, onShowOrderHistory, onBack }) => {
    return (
        <div className="grid grid-cols-2 items-center border-4 m-0 p-0">
            {/* Left side: Filter, Search, Sort */}
            <div className="flex space-x-4">
                <Filter/>
                <Search/>
                <Sort/>
            </div>

            {/* Right side: Order History and Back buttons */}
            <div className="flex justify-end space-x-4">
                {!showOrderHistory && (
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={onShowOrderHistory}
                    >
                        Order History
                    </button>
                )}

                {showOrderHistory && (
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded"
                        onClick={onBack}
                    >
                        Back
                    </button>
                )}
            </div>
        </div>
    );

}

export default SearchingTab;
