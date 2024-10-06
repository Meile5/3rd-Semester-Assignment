import React, {useEffect, useState} from 'react';
import {http} from "../http.ts";
import {FilteredPapersAtom} from "../atoms/FilteredPaperAtom.tsx";
import {useAtom} from "jotai";
import {PaperDto} from "../Api.ts";
import { SharedPapersAtom } from '../atoms/SharedPapersAtom.tsx';
import { PapersAtom } from '../atoms/PapersAtom.tsx';


const SearchComponent: React.FC = () => {
    const [filteredItems, setFilteredItems] = useAtom(FilteredPapersAtom)
    const [searchQuery, setSearchQuery] = useState('');
    const [sharedPapers, setSharedPapers] = useAtom(SharedPapersAtom); 
    const [papers] = useAtom(PapersAtom);
    const [isItemSelected, setIsItemSelected] = useState(false);

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query); // Update the search query

        if (query.trim() === '') {
            setFilteredItems([]);
            return;
        }

        try {

            const response = await http.api.paperSearchItems({query});
            setFilteredItems(response.data); // Set the filtered items based on the API response
        } catch (e) {
            console.error(e);

        }
    };

    const handleItemSelect = (item: PaperDto) => {
        setSharedPapers([item]); 
        setFilteredItems([]); 
        setSearchQuery('');
        setIsItemSelected(true);
    };
    const handleBackToList = () => {
        setSharedPapers(papers); 
        setSearchQuery('');
        setIsItemSelected(false);
    };
return (
    <div>
        <label className="input flex items-center gap-1 border border-gray-300 rounded-md p-1 text-sm"
               style={{height: '40px', width: '180px'}}>
            <input type="text" className="w-full outline-none border-none focus:ring-0 p-1" placeholder="Search"
                   value={searchQuery}
                   onChange={handleSearchChange}/>
            <button onClick={isItemSelected ? handleBackToList : undefined} className="ml-2">
                {isItemSelected ? ( // Change icon based on selection state
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
                    </svg>

                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                    </svg>

                )}
            </button>
        </label>

        {filteredItems.length > 0 && (
            <ul className="absolute bg-white rounded-md mt-1 z-10 " style={{width: "180px"}}>
                {filteredItems.map(item => (
                    <li
                        key={item.id}
                        className="p-2 cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 rounded-md"
                        onClick={() => handleItemSelect(item)}

                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        )}
    </div>


);
}

export default SearchComponent;