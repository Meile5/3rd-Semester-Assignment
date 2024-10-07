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
                const priceA = a.price ?? 0;  // Fallback to 0 if price is undefined
                const priceB = b.price ?? 0;
                return order === 'asc' ? priceA - priceB : priceB - priceA;
            }
            if (field === 'name') {
                const nameA = a.name ?? '';  // Fallback to empty string if name is undefined
                const nameB = b.name ?? '';
                return order === 'asc'
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
            }
            return 0;
        });
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
