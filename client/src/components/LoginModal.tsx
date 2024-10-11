import React, { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { LoggedCustomerAtom } from "../atoms/LoggedCustomerAtom.tsx";
import toast from "react-hot-toast";


interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [loggedCustomer] = useAtom(LoggedCustomerAtom);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.name === loggedCustomer.name && formData.email === loggedCustomer.email) {
            toast.success(`Welcome, ${loggedCustomer.name}! You have successfully logged in.`);

            onClose();
            navigate("/papers");
        } else {
            toast.error("Invalid credentials. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4">Customer Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full mb-2"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full mb-2"
                    />


                    {/* Flex container to align buttons on the same line */}
                    <div className="flex justify-between mt-4">
                        <button
                            type="submit"
                            className="bg-black text-white py-2 rounded-none border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-300 text-center whitespace-nowrap pr-1 pl-1"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>

                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}
