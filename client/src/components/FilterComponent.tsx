import React, { useRef, useState, useEffect } from 'react';
import '../resources/styles/Buttons.css';

const FilterComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <div ref={dropdownRef} className="relative">
            <button
                className="text-black border-b-2 border-transparent hover:border-black transition-all duration-300 cursor-pointer"
                onClick={toggleDropdown}
            >
                Filter
            </button>
            {isOpen && (
                <ul className="menu dropdown-content absolute bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            )}
        </div>
    );
}

export default FilterComponent;
