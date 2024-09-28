
import React, {useState} from 'react';
import { useAtom } from 'jotai';
import { PapersAtom } from '../atoms/PapersAtom';
import PaperList from './PaperList';
import {useNavigate} from "react-router-dom";
import Header from './CustomerHeader';
import SearchTab from './SearchingTab';

// @ts-ignore
import book from '../resources/images/book.jpg';
import OrderHistory from "./OrderHistory.tsx";

const CustomerPage: React.FC = () => {
    const navigate = useNavigate();
    const [showOrderHistory, setShowOrderHistory] = useState(false); // Track order history view

    const showOrderHistoryHandler = () => {
        setShowOrderHistory(true); // Show order history
    };

    const backToPapersHandler = () => {
        setShowOrderHistory(false); // Return to paper list
    };

    return (
        <div className="m-0 p-0">
            <Header />

            {/* Top image with negative margin to ensure no gap */}
            <div className="relative -mt-2">
                <img
                    src={book}
                    alt="Nordic Paper"
                    className="w-full h-auto max-h-[55vh] object-cover m-0 p-0"
                />
            </div>

            {/* SearchTab with buttons for Order History and Back */}
            <SearchTab
                showOrderHistory={showOrderHistory}
                onShowOrderHistory={showOrderHistoryHandler}
                onBack={backToPapersHandler}
            />

            {/* Conditionally render PaperList or OrderHistory */}
            {!showOrderHistory ? <PaperList /> : <OrderHistory />}
        </div>
    );

}

    export default CustomerPage;
