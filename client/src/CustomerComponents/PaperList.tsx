import {PapersAtom} from "../atoms/PapersAtom.tsx"
import {useAtom} from "jotai";
// @ts-ignore
import image1 from "../resources/images/paper.jpg";
import React, {useEffect, useState} from 'react';
import {http} from "../http.ts";
import {PaperDto} from "../Api.ts";
import {CartAtom} from '../atoms/CartAtom.tsx'
import {TotalCountCustomersAtom} from "../atoms/TotalCountAtom.tsx";
import {useInitializeData} from "../useInitializeData.ts";
import { SharedPapersAtom } from "../atoms/SharedPapersAtom.tsx";
import {IsFilterActive} from "../atoms/FilterSortAtoms.tsx";



export default function PaperList() {
    const [sharedPapers, setSharedPapers] = useAtom(SharedPapersAtom);
    const [isFilterActive, setIsFilterActive] = useAtom(IsFilterActive);
    const [papers, setPapers] = useAtom(PapersAtom);
    const [totalCount] = useAtom(TotalCountCustomersAtom);
    const [cartItems, setCartItems] = useAtom(CartAtom);
    const [startAt, setStartAt] = useState(0);
    const limit = 10;

    const fetchPapers = (startAt: number) => {
        http.api.paperGetCustomersPapers({ limit, startAt })
            .then((response) => {
                setPapers((prevPapers) => [...prevPapers, ...response.data]);
                setSharedPapers((prevSharedPapers) => [...prevSharedPapers, ...response.data]);
            });
    };

    useInitializeData();

    useEffect(() => {
        // Reset papers and startAt when the component mounts
        setPapers([]);  // Clear the previous papers list
        setSharedPapers([]);
        setStartAt(0);  // Reset the starting index
    }, []);  // This effect runs once when the component mounts

    useEffect(() => {
        fetchPapers(startAt);  // Fetch papers based on startAt
    }, [startAt]);  // Re-fetch papers when startAt changes

    const handleLoadMore = () => {
        setStartAt((prevStartAt) => prevStartAt + limit);
    };

    const handleAddToCart = (paper: PaperDto) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(item => item.id === paper.id);

            if (existingItem) {
                // Update the quantity if the item is already in the cart
                return currentItems.map(item =>
                    item.id === paper.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            // Add new item to the cart
            return [...currentItems, { id: paper.id, name: paper.name, quantity: 1, price: paper.price }];
        });
    };

    return (
        <div>
            {sharedPapers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-10 mt-10">
                    {sharedPapers.map((paper) => (
                        <div key={paper.id}>
                            <div
                                className="card w-96 h-96 shadow-xl relative bg-cover bg-center mb-6"
                                style={{
                                    backgroundImage: `url(${image1})`,
                                }}
                            >
                                <div
                                    className="absolute inset-8 bg-white flex flex-col justify-between items-start p-5 overflow-hidden"
                                >
                                    <h2 className="card-title mb-6">{paper.name}</h2>
                                    <p className="mb-1 font-bold">Properties</p>
                                    {paper.properties && paper.properties.length > 0 ? (
                                        <ul
                                            style={{
                                                overflowY: 'scroll',
                                                maxHeight: '80px',
                                                scrollbarWidth: 'none',
                                            }}
                                            className="list-disc list-inside mb-5"
                                        >
                                            {paper.properties.map((property, index) => (
                                                <li key={index}>
                                                    {property.propertyName}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="mb-5">No properties available.</p>
                                    )}
                                    <div className="w-full mt-auto">
                                        <p className="text-lg font-semibold mb-4">{paper.price} €</p>
                                        <button
                                            className="btn btn-outline btn-black w-full p-2 rounded-md hover:bg-black hover:text-white transition-colors"
                                            onClick={() => handleAddToCart(paper)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {papers.length <= totalCount && !isFilterActive && (
                <div className="flex flex-col items-center mt-6">
                    <button
                        onClick={handleLoadMore}
                        className="text-black border-b-2 border-transparent hover:border-black transition-all duration-300 mb-4"
                    >
                        Load More
                    </button>
                    <p>{papers.length} of {totalCount}</p>
                </div>
            )}
        </div>

    );
}