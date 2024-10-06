import React from 'react';

const SearchComponent: React.FC = () => {
    return (
        <label className="input flex items-center gap-1 border border-gray-300 rounded-md p-1 text-sm" style={{ height: '40px', width: '180px' }}>
            <input type="text" className="w-full outline-none border-none focus:ring-0 p-1" placeholder="Search"/>
            <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 19 19"
                    fill="currentColor"
                    className="h-6 w-6 opacity-70">
                    <path
                        fill-rule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clip-rule="evenodd"/>
                </svg>
            </button>

        </label>


    );
}

export default SearchComponent;