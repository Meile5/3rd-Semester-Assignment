import React from "react";
import { useAtom } from "jotai";
import { CartAtom } from '../atoms/CartAtom';

const CartTabBase: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({ isOpen, onClose }) => {
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
                <h3 className="text-l font-bold mb-4 text-black">Total: €{totalAmount.toFixed(2)}</h3>
            </div>
    );
};

export default CartTabBase;
