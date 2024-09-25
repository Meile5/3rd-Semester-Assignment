
import React from 'react';
import { useAtom } from 'jotai';
import { PapersAtom } from '../atoms/PapersAtom';
import PaperList from './PaperList';
import {useNavigate} from "react-router-dom"; 


const CustomerPage: React.FC = () => {
    const [papers] = useAtom(PapersAtom); 
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex ml-9">
                <button className="btn btn-outline btn-black" onClick={() => navigate('/')}>
                    Back
                </button>
            </div>

            <div>
                <div className="flex items-center justify-between p-5">
                    <h1 className="menu-title text-5xl">Papers</h1>
                </div>
            </div>

            {/* Papers List */}
            <PaperList/>
        </div>
    );
};

export default CustomerPage;
