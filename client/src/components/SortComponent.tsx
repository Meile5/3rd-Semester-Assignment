import React, { useRef, useState, useEffect } from 'react';
import '../resources/styles/Buttons.css';
import {SortFieldAtom, SortOrderAtom} from "../atoms/FilterSortAtoms.tsx";
import {useAtom} from "jotai";
import {SharedPapersAtom} from "../atoms/SharedPapersAtom.tsx";

const SortComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortField, setSortField] = useAtom(SortFieldAtom);
    const [sortOrder, setSortOrder] = useAtom(SortOrderAtom);
    const [sharedPapers, setSharedPapers] = useAtom(SharedPapersAtom);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false); // Close dropdown if clicked outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSortSelect = (field: string, order: string) => {
        setSortField(field);
        setSortOrder(order);
        sortPapersFrontend(field, order);  // Sort papers after updating the sorting fields
        setIsOpen(false);  // Close the dropdown after selecting an option
    };


    const sortPapersFrontend = (field: string, order: string) => {
        const sortedPapers = [...sharedPapers].sort((a, b) => {
            if (field === 'price') {
                return order === 'asc' ? a.price - b.price : b.price - a.price;
            }
            if (field === 'name') {
                return order === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }
            return 0;
        });
        console.log(sortedPapers);
        setSharedPapers(sortedPapers);  // Update sorted papers in shared state
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                className="text-black border-b-2 border-transparent hover:border-black transition-all duration-300 cursor-pointer"
                onClick={toggleDropdown}
            >
                Sort
            </button>
            {isOpen && (
                <ul className="menu dropdown-content absolute bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li onClick={() => handleSortSelect('name', 'asc')}>
                        <a>Name (A-Z)</a>
                    </li>
                    <li onClick={() => handleSortSelect('name', 'desc')}>
                        <a>Name (Z-A)</a>
                    </li>
                    <li onClick={() => handleSortSelect('price', 'asc')}>
                        <a>Price (Low-High)</a>
                    </li>
                    <li onClick={() => handleSortSelect('price', 'desc')}>
                        <a>Price (High-Low)</a>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default SortComponent;
