import React from "react";
import  {useAtom} from "jotai";
import {CartAtom} from '../atoms/CartAtom'

const CartTab: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose}) => {
    const [cartItems, setCartItems] = useAtom(CartAtom);

    // Calculate the total amount with a fallback for undefined price
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);


    const handleIncreaseQuantity = (itemId: number | undefined) => {
        setCartItems((currentItems) =>
            currentItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };
    const handleDecreaseQuantity = (itemId: number | undefined) => {
        setCartItems((currentItems) =>
            currentItems.map(item =>
                item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };
    const handleRemoveItem = (itemId: number | undefined) => {
        setCartItems((currentItems) =>
            currentItems.filter(item => item.id !== itemId)
        );
    };


    return (
        <div className={`fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg p-4 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
             style={{
                 top: "5.7rem",
                 height: "auto",
                 maxHeight: "80vh",
                 width: "22vw",
                 zIndex: 1000 // Ensure it stays on top of other content
             }}
        >
            <h2 className="text-xl font-bold mb-4 text-black">Your Cart</h2>
            <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto"> {/* Scrollable area for items */}
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id} className="flex flex-col mb-4 mt-3 text-black">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="btn bg-transparent text-black"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => handleDecreaseQuantity(item.id)}
                                                className="btn bg-transparent text-black"
                                            >
                                                -
                                            </button>
                                            <p className="mx-2">{item.quantity}</p>
                                            <button
                                                onClick={() => handleIncreaseQuantity(item.id)}
                                                className="btn bg-transparent text-black"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="mr-4">€{item.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mt-4 border-t pt-6"> {/* Total and Checkout section */}
                    <h3 className="text-l font-bold mb-4 text-black">Total: €{totalAmount.toFixed(2)}</h3>
                    <div className="flex justify-center">
                        <button className="w-full bg-black text-white py-2 rounded-none border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-300">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartTab;
