import React, {useState} from 'react';
import PaperList from './PaperList';
import book from '../resources/images/book.jpg';

const CustomerPage: React.FC = () => {

    return (
        <div className="m-0 p-0 mb-10">

            {/* Top image with negative margin to ensure no gap */}
            <div className="relative -mt-2">
                <img
                    src={book}
                    alt="Nordic Paper"
                    className="w-full h-auto max-h-[55vh] object-cover m-0 p-0"
                />
            </div>
            <PaperList/>
        </div>
    );

}

export default CustomerPage;
