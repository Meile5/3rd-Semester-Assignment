import React from "react";
import { Link } from "react-router-dom";
import CartTabBase from './CartTabBase'; 

const CartTab: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg p-4 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
             style={{
                 top: "5.1rem",
                 height: "auto",
                 maxHeight: "80vh",
                 width: "22vw",
                 zIndex: 1000 // Ensure it stays on top of other content
             }}
        >
            <h2 className="text-xl font-bold mb-4 text-black">Your Cart</h2>
            <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto"> 
                    <CartTabBase /> 
                </div>
                <div className="mt-4 border-t pt-6"> 
                    <div className="flex justify-center">
                        <Link
                            to="/checkout"
                            className="w-full bg-black text-white py-2 rounded-none border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-300 text-center"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartTab;
