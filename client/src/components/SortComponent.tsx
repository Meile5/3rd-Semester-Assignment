import React from 'react';
import '../resources/styles/Buttons.css';

const SortComponent: React.FC = () => {
    return (
        <details className="dropdown">
            <summary className="btn-black">Sort</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
        </details>
    );
}

export default SortComponent;