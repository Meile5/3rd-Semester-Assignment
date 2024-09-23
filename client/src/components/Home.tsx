import React, {useEffect} from "react";
import {useAtom} from "jotai";
import {PapersAtom} from "../atoms/PapersAtom.tsx";
import {useInitializeData} from "../useInitializeData.ts";
import {useNavigate} from "react-router-dom";

export default function Home() {

    const [, setProducts] = useAtom(PapersAtom);
    const navigate = useNavigate();

    useEffect(() => {
        
    },[])
    
    useInitializeData();

    return (
        <div>
            <h1 className="menu-title text-5xl m-5"> Nordic Paper </h1>

            <div className="flex mt-20 justify-evenly">

                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl"/>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Admin</h2>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl" onClick={e => navigate("/papers")}>
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl"/>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Customer</h2>
                    </div>
                </div>
                
            </div>

        </div>
    );
}