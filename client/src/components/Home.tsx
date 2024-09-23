import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { PapersAtom } from "../atoms/PapersAtom.tsx";
import { useInitializeData } from "../useInitializeData.ts";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import image2 from '../resources/images/image2.jpg';
import Footer from "./Footer.tsx";

export default function Home() {
    const [, setProducts] = useAtom(PapersAtom);
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    useInitializeData();

    return (
        <div>
            {/* Top image with overlay text */}
            <div className="relative">
                <img
                    src={image2}
                    alt="Nordic Paper"
                    className="w-full h-auto max-h-[55vh] object-cover"
                />
                <h1 className="absolute top-5 left-5 text-white text-5xl font-bold shadow-md">
                    Nordic Paper
                </h1>
            </div>

            {/* Cards for Admin and Customer */}
            <div className="flex mt-20 justify-evenly mb-32">
                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Admin"
                            className="rounded-xl"
                        />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Admin</h2>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl" onClick={e => navigate("/papers")}>
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Customer"
                            className="rounded-xl"
                        />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Customer</h2>
                    </div>
                </div>
            </div>
            {<Footer/>}
        </div>
    );
}
