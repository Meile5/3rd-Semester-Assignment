import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {http} from "../http.ts";
import {PropertyDto} from "../Api.ts";

interface CreatePaperModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreatePaperModal({ isOpen, onClose }: CreatePaperModalProps) {
    const [formData, setFormData] = useState<{
        name: string;
        price: string;
        stock: string;
        discontinued: boolean;
        properties: string[];
    }>({
        name: "",
        price: "",
        stock: "",
        discontinued: false,
        properties: []
    });

    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
    const [availableProperties, setAvailableProperties] = useState<PropertyDto[]>([]);
    const [newProperty, setNewProperty] = useState("");

    useEffect(() => {

        // Fetch available properties for the filter dropdown
        http.api.paperGetAllProperties().then((response) => {
            setAvailableProperties(response.data); // Set properties to populate the filter options
        });

    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        const uniqueSelected = [...new Set([...selectedProperties, ...selected])];

        setSelectedProperties(uniqueSelected);
        setFormData({
            ...formData,
            properties: uniqueSelected // Sync properties with formData
        });
    };

    const handleNewPropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProperty(e.target.value);
    };

    const handleAddNewProperty = () => {
        if (newProperty && !selectedProperties.includes(newProperty)) {
            const updatedProperties = [...selectedProperties, newProperty];
            setSelectedProperties(updatedProperties);
            setFormData({
                ...formData,
                properties: updatedProperties // Sync with formData
            });
            setNewProperty(""); // Clear the input field after adding
        }
    };

    const handleRemoveProperty = (property: string) => {
        setSelectedProperties(selectedProperties.filter(p => p !== property));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newPaperData = {
            ...formData,
            properties: selectedProperties // Add the selected properties to the form data
        };

        http.api.createPaper(newPaperData).then(() => {
            toast.success(`Paper "${formData.name}" created successfully with properties!`);
            onClose(); // Close the modal after submission
        }).catch(err => {
            toast.error("Failed to create paper. Please try again.");
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4">Create New Paper</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Paper Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full mb-2"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full mb-2"
                    />
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full mb-2"
                    />
                    <label className="flex items-center mt-2">
                        <input
                            type="checkbox"
                            name="discontinued"
                            checked={formData.discontinued}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        Discontinued
                    </label>

                    {/* Property Selection */}
                    <div className="mt-4">
                        <label className="block mb-2 font-bold">Select Properties:</label>
                        <select
                            multiple
                            value={selectedProperties}
                            onChange={handlePropertyChange}
                            className="input input-bordered w-full h-20 mb-2 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            {availableProperties.map(property => (
                                <option
                                    key={property.id}
                                    value={property.propertyName}
                                    className="hover:bg-gray-100 focus:bg-transparent"
                                >
                                    {property.propertyName}
                                </option>
                            ))}
                        </select>

                        {/* Add New Property */}
                        <div className="mt-4 flex">
                            <input
                                type="text"
                                placeholder="Create New Property"
                                value={newProperty}
                                onChange={handleNewPropertyChange}
                                className="input input-bordered flex-grow"
                            />
                            <button
                                type="button"
                                onClick={handleAddNewProperty}
                                className="ml-2 h-12 bg-black text-white px-3 rounded-none border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-300"
                            >
                                Add
                            </button>
                        </div>

                        {/* Display Selected Properties */}
                        <div className="mt-4">
                            <h4 className="mb-4 font-bold">Selected Properties:</h4>
                            {selectedProperties.length > 0 ? (
                                <ul>
                                    {selectedProperties.map(property => (
                                        <li key={property} className="flex justify-between">
                                            <span>{property}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveProperty(property)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No properties selected yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            type="submit"
                            className="bg-black text-white py-2 px-2 rounded-none border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-300"
                        >
                            Create Paper
                        </button>
                        <button
                            type="button"
                            className="bg-black text-white py-2 px-2 rounded-none border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-300"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
