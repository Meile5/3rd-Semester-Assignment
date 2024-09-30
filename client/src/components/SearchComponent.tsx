import React from 'react';

const SearchComponent: React.FC = () => {
    return (
        <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-32 h-8"
        />
    );
}

export default SearchComponent;