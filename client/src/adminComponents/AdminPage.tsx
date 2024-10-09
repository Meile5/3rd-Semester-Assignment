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
            <div className="flex justify-items-start items-center mt-10 ml-10 space-x-3">
                <DocumentPlusIcon className="w-10 h-10 cursor-pointer hover:shadow-lg hover:shadow-gray-500 transition-shadow duration-200" onClick={openCreateModal}/>
                <span>Add Paper</span>
            </div>

            {/* Paper List */}
            <PaperListAdmin />

            {/* Create Paper Modal */}
            {isCreateModalOpen && <CreatePaperModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />}
        </div>
    );

}

export default AdminPage;
