import React, { useRef, useState, useEffect } from 'react';
import '../resources/styles/Buttons.css';
import {http} from "../http";
import {SelectedPriceRangeAtom, SelectedPropertyAtom} from "../atoms/FilterSortAtoms.tsx";
import {useAtom} from "jotai";

const FilterComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [availableProperties, setAvailableProperties] = useState<string[]>([]);
    const [selectedProperty, setSelectedProperty] = useAtom(SelectedPropertyAtom);
    const [selectedPriceRange, setSelectedPriceRange] = useAtom(SelectedPriceRangeAtom);
    const dropdownRef = useRef<HTMLDivElement>(null);


    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false); // Close dropdown if clicked outside
        }
    };

    useEffect(() => {
        /*
        // Fetch available properties for the filter dropdown
        http.api.paperGetProperties().then((response) => {
            setAvailableProperties(response.data); // Set properties to populate the filter options
        });
         */

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handlePropertySelect = (property: string) => {
        setSelectedProperty(property);
        setSelectedPriceRange(null); // Reset price range when property is selected
        setIsOpen(false);
    };

    const handlePriceRangeSelect = (priceRange: string) => {
        setSelectedPriceRange(priceRange);
        setIsOpen(false);
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
                    <h3 className="font-bold mb-2">Filter by Property</h3>
                    <ul className="mb-4">
                        {availableProperties.map((property, index) => (
                            <li key={index} className="cursor-pointer hover:bg-gray-100 p-1"
                                onClick={() => handlePropertySelect(property)}>
                                {property}
                            </li>
                        ))}
                    </ul>

                    <h3 className="font-bold mb-2">Filter by Price Range</h3>
                    <ul>
                        <li className="cursor-pointer hover:bg-gray-100 p-1"
                            onClick={() => handlePriceRangeSelect('0-19')}>0€ - 19€
                        </li>
                        <li className="cursor-pointer hover:bg-gray-100 p-1"
                            onClick={() => handlePriceRangeSelect('20-49')}>20€ - 49€
                        </li>
                        <li className="cursor-pointer hover:bg-gray-100 p-1"
                            onClick={() => handlePriceRangeSelect('50-79')}>50€ - 79€
                        </li>
                        <li className="cursor-pointer hover:bg-gray-100 p-1"
                            onClick={() => handlePriceRangeSelect('89-119')}>80€ - 119€
                        </li>
                    </ul>
                </ul>
            )}
        </div>
    );
}

export default FilterComponent;
