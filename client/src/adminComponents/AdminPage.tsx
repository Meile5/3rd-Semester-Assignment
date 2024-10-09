import React, {useState} from 'react';
import book from '../resources/images/book.jpg';
import {DocumentPlusIcon} from "@heroicons/react/24/outline";
import PaperListAdmin from "./PaperListAdmin.tsx";
import CreatePaperModal from "./CreatePaperModal";
import {useNavigate} from "react-router-dom";

const AdminPage: React.FC = () => {

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const openCreateModal = () => setCreateModalOpen(true);
    const closeCreateModal = () => setCreateModalOpen(false);


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
            {/* Button with Plus Icon to add a new paper */}
            <div className="flex justify-items-start items-center mt-10 ml-10 space-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 transition-transform transform hover:scale-110 cursor-pointer"
                    onClick={openCreateModal}
                >
                    <path
                        strokeLinecap="round" strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                </svg>
                <span>Add Paper</span>
            </div>

            {/* Paper List */}
            <PaperListAdmin/>

            {/* Create Paper Modal */}
            {isCreateModalOpen && <CreatePaperModal isOpen={isCreateModalOpen} onClose={closeCreateModal}/>}
        </div>
    );

}

export default AdminPage;
