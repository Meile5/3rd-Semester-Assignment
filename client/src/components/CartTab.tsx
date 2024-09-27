import React from "react";
import  {useAtom} from "jotai";
import {CartAtom} from '../atoms/CartAtom'

const CartTab: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose}) => {
    const [cartItems, setCartItems] = useAtom(CartAtom);

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
             style={{ zIndex: 1000 }} // Ensure it stays on top of other content
        >
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id} className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p>Price: €{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleDecreaseQuantity(item.id)}
                                    className="btn btn-outline mx-1"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => handleIncreaseQuantity(item.id)}
                                    className="btn btn-outline mx-1"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="btn btn-outline mx-1"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartTab;
