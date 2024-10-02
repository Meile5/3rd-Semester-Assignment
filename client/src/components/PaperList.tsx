import {PapersAtom} from "../atoms/PapersAtom.tsx"
import {useAtom} from "jotai";
// @ts-ignore
import image1 from "../resources/images/image1.jpeg";
import React, {useEffect, useState} from 'react';
import {http} from "../http";
import {PaperDto} from "../Api.ts";
import {CartAtom} from '../atoms/CartAtom'
import {TotalCountAtom} from "../atoms/TotalCountAtom.tsx";
import {useInitializeData} from "../useInitializeData.ts";



export default function PaperList() {
    const [papers, setPapers] = useAtom(PapersAtom);
    const [totalCount] = useAtom(TotalCountAtom);
    const [cartItems, setCartItems] = useAtom(CartAtom);
    const [startAt, setStartAt] = useState(0);
    const limit = 10;

    // Fetch papers with start and limit index
    const fetchPapers = (startAt: number) => {
         http.api.paperGetAllPapers({ limit, startAt })
            .then((response) => {
                setPapers((prevPapers) => [...prevPapers, ...response.data]);  // Append new papers
            });
    };

    useInitializeData();

    useEffect(() => {
        fetchPapers(startAt);
    }, [startAt]);

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
            {papers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-10 mt-10">
                    {papers.map((paper) => (
                        <div key={paper.id}>
                            <div
                                className="card w-96 h-96 shadow-xl relative bg-cover bg-center mb-6"
                                style={{
                                    backgroundImage: `url(${image1})`,
                                }}
                            >
                                <div
                                    className="absolute inset-8 bg-white flex flex-col justify-between items-start p-5">
                                    <h2 className="card-title mb-6">{paper.name}</h2>
                                    <p className="mb-8">Properties</p>
                                    {paper.properties && paper.properties.length > 0 ? (
                                        <ul className="list-disc list-inside mb-4">
                                            {paper.properties.map((property, index) => (
                                                <li key={index}>
                                                    {property.propertyName}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No properties available.</p>
                                    )}
                                    <p className="text-lg font-semibold mb-4">{paper.price} dkk</p>
                                    <div className="w-full mt-auto">
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
            <div className="flex flex-col items-center mt-6">
                <button onClick={handleLoadMore} className="text-black border-b-2 border-transparent hover:border-black transition-all duration-300 mb-4">
                    Load More
                </button>
                <p>{papers.length} of {totalCount}</p>
            </div>
        </div>
    );
}