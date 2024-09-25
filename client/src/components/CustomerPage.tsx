
import React from 'react';
import { useAtom } from 'jotai';
import { PapersAtom } from '../atoms/PapersAtom';
import PaperList from './PaperList';
import {useNavigate} from "react-router-dom";
import Header from './CustomerHeader';

// @ts-ignore
import book from '../resources/images/book.jpg';

const CustomerPage: React.FC = () => {
    const navigate = useNavigate();

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

            {/* Papers List */}
            <PaperList />
        </div>
    );

}

    export default CustomerPage;
