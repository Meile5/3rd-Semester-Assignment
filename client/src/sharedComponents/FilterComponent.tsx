import React, { useRef, useState, useEffect } from 'react';
import '../resources/styles/Buttons.css';
import {http} from "../http.ts";
import {FilterSortPapersAtom, IsFilterActive, SelectedPriceRangeAtom, SelectedPropertyAtom} from "../atoms/FilterSortAtoms.tsx";
import {useAtom} from "jotai";
import {SharedPapersAtom} from "../atoms/SharedPapersAtom.tsx";
import {TotalCountAtom} from "../atoms/TotalCountAtom.tsx";
import {PapersAtom} from "../atoms/PapersAtom.tsx";
import {PropertyDto} from "../Api.ts";

const FilterComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [availableProperties, setAvailableProperties] = useState<PropertyDto[]>([]);
    const [propertieSelected, setSelectedProperty] = useAtom(SelectedPropertyAtom);
    const [priceRange, setSelectedPriceRange] = useAtom(SelectedPriceRangeAtom);
    const [filterSortItems, setFilterSortItems] = useAtom(FilterSortPapersAtom);
    const [sharedPapers, setSharedPapers] = useAtom(SharedPapersAtom);
    const [totalCount] = useAtom(TotalCountAtom);
    const [papers] = useAtom(PapersAtom);
    const [isFilterActive, setIsFilterActive] = useAtom(IsFilterActive);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const limit = totalCount;
    const startAt = 0;
    const sortField = "name";
    const sortOrder = "asc";



    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false); // Close dropdown if clicked outside
        }
    };

    useEffect(() => {

        // Fetch available properties for the filter dropdown
        http.api.paperGetAllProperties().then((response) => {
            setAvailableProperties(response.data); // Set properties to populate the filter options
        });


        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handlePropertySelect = async (property: string) => {
        setSelectedProperty(property);
        setSelectedPriceRange(""); // Reset price range when property is selected

        const query = {
            limit,
            startAt,
            sortField,
            sortOrder,
            priceRange: "",
            propertieSelected: property,
        };

        try {
            const response = await http.api.paperGetFilteredPapers(query);
            setSharedPapers(response.data); // Set the filtered items based on the API response
        } catch (e) {
            console.error(e);
        }
        setIsFilterActive(true);
        setIsOpen(false);
    };

    const handlePriceRangeSelect = async (priceRange: string) => {
        setSelectedPriceRange(priceRange);
        setSelectedProperty("");

        const query = {
            limit,
            startAt,
            sortField,
            sortOrder,
            priceRange,
            propertieSelected: "",
        };

        try {
            const response = await http.api.paperGetFilteredPapers(query);
            setSharedPapers(response.data);
        } catch (e) {
            console.error(e);
        }
        setIsFilterActive(true);
        setIsOpen(false);
    };

    const handleBackToList = () => {
        setSharedPapers(papers);
        setFilterSortItems([]);
        setSelectedProperty("");
        setSelectedPriceRange("");
        setIsFilterActive(false);
    };

    return (
        <div ref={dropdownRef} className="relative">
                {isFilterActive && (
                    <button
                        className="mr-2 text-red-500 hover:text-red-700"
                        onClick={handleBackToList}
                    >
                        Clear
                    </button>
                )}
            <button
                className="text-black border-b-2 border-transparent hover:border-black transition-all duration-300 cursor-pointer"
                onClick={toggleDropdown}
            >
                Filter
            </button>
            {isOpen && (
                <ul className="menu dropdown-content absolute bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {availableProperties.length > 0 && (
                        <>
                            <h3 className="font-bold mb-2">Filter by Property</h3>
                            <ul className="mb-4">
                                {availableProperties.map((property, index) => (
                                    <li key={index} className="cursor-pointer hover:bg-gray-100 p-1"
                                        onClick={() => handlePropertySelect(property.propertyName as string)}>
                                        {JSON.stringify(property.propertyName)}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

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
