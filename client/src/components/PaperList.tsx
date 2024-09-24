import {PapersAtom} from "../atoms/PapersAtom.tsx"
import {useAtom} from "jotai";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import image1 from "../resources/images/image1.jpeg";
import React, {useEffect, useState} from 'react';
import {http} from "../http";
import { AxiosResponse } from "axios";
import {PaperDto} from "../Api.ts";



export default function PaperList() {
    
    const navigate = useNavigate();
    const [papers, setProducts] = useAtom(PapersAtom);


    return (<>
        <div>
            <div className="flex ml-9">
                <button className="btn btn-outline btn-black" onClick={() => navigate('/')}>
                    Back
                </button>
            </div>

            <div>
                <div className="flex items-center justify-between p-5">
                    <h1 className="menu-title text-5xl">Papers</h1>
                </div>
            </div>

            {papers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-10 mt-10">
                    {papers.map((paper) => (
                        <div key={paper.id}>
                            <div
                                className="card w-96 h-96 shadow-xl relative bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${image1})`,
                                }}
                            >
                                {/* White box containing the paper details */}
                                <div
                                    className="absolute inset-8 bg-white flex flex-col justify-between items-start p-5">
                                    <h2 className="card-title mb-6">{paper.name}</h2>
                                    <p className="mb-8">Some description</p>
                                    <ul className="list-disc list-inside mb-4">
                                        <li>Property 1</li>
                                        <li>Property 2</li>
                                        <li>Property 3</li>
                                    </ul>
                                    <div className="w-full mt-auto">
                                        <button
                                            className="btn btn-outline btn-black w-full p-2"
                                            onClick={() => navigate("/papers/" + paper.id)}
                                            key={paper.id}
                                        >
                                            Open Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </>)
}