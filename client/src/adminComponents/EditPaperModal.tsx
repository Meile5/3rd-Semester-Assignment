import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { http } from "../http.ts";
import {PaperDto, PropertyDto} from "../Api.ts";
import { useAtom } from "jotai/index";
import { SharedPapersAtom } from "../atoms/SharedPapersAtom.tsx";

interface EditPaperModalProps {
    isOpen: boolean;
    onClose: () => void;
    paper?: PaperDto;
}

export default function EditPaperModal({ isOpen, onClose, paper }: EditPaperModalProps) {
    const [formData, setFormData] = useState<{
        name: string;
        price: number;
        stock: number;
        discontinued: boolean;
        properties: PropertyDto[];
    }>({
        name: paper?.name || "",
        price: paper?.price || 0,
        stock: paper?.stock || 0,
        discontinued: paper?.discontinued || false,
        properties: paper?.properties || []
    });

    const [sharedPapers, setSharedPapers] = useAtom(SharedPapersAtom);
    const [availableProperties, setAvailableProperties] = useState<PropertyDto[]>([]);
    const [selectedProperties, setSelectedProperties] = useState<PropertyDto[]>([]);
    const [newProperty, setNewProperty] = useState("");

    useEffect(() => {
        http.api.paperGetAllProperties().then((response) => {
            setAvailableProperties(response.data);
        });
    }, []);

    useEffect(() => {
        if (paper) {
            setFormData({
                name: paper.name || "",
                price: paper.price || 0,
                stock: paper.stock || 0,
                discontinued: paper.discontinued || false,
                properties: paper.properties || [],
            });
            setSelectedProperties(paper.properties || []);
        }
    }, [paper]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
        const selectedProps = availableProperties.filter(property => selectedIds.includes(property.id?.toString() as string));

        const uniqueSelected = [...new Set([...selectedProperties, ...selectedProps])];

        setSelectedProperties(uniqueSelected);
        setFormData({
            ...formData,
            properties: uniqueSelected // Sync properties with formData as PropertyDto[]
        });
    };

    const handleNewPropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProperty(e.target.value);
    };

    const handleAddNewProperty = () => {
        if (newProperty && !selectedProperties.some(prop => prop.propertyName === newProperty)) {
            const newProp: PropertyDto = { propertyName: newProperty };
            const updatedProperties = [...selectedProperties, newProp];
            setSelectedProperties(updatedProperties);
            setFormData({ ...formData, properties: updatedProperties });
            setNewProperty("");
        }
    };

    const handleRemoveProperty = (propertyId: number | undefined) => {
        const updatedProperties = selectedProperties.filter(p => p.id !== propertyId);
        setSelectedProperties(updatedProperties);
        setFormData({ ...formData, properties: updatedProperties });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!paper) {
            toast.error("No paper selected for editing.");
            return;
        }

        http.api.adminEditPaper({ ...formData, id: paper.id })
            .then(response => {
                setSharedPapers(prev => prev.map(p => (p.id === paper.id ? response.data : p)));
                toast.success(`Paper "${formData.name}" updated successfully!`);
                onClose();
            })
            .catch(err => {
                toast.error("Failed to update paper. Please try again.");
            });
    };

    if (!isOpen || !paper) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4">Edit Paper</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 font-bold">Paper Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Paper Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full mb-2"
                    />
                    <label className="block mb-2 font-bold">Price:</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full mb-2"
                    />
                    <label className="block mb-2 font-bold">Items in Stock:</label>
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
                            value={selectedProperties.map(prop => prop.propertyName as string)}
                            onChange={handlePropertyChange}
                            className="input input-bordered w-full h-20 mb-2 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            {availableProperties.map(property => (
                                <option
                                    key={property.id}
                                    value={property.id}
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
                    </div>

                    {/* Display Selected Properties */}
                    <div className="mt-4">
                        <h4 className="mb-4 font-bold">Selected Properties:</h4>
                        {selectedProperties.length > 0 ? (
                            <ul
                                style={{
                                    overflowY: 'scroll',
                                    maxHeight: '80px',
                                    scrollbarWidth: 'none',
                                }}
                                className="list-disc list-inside mb-5"
                            >
                                {selectedProperties.map(property => (
                                    <li key={property.id} className="flex justify-between">
                                        <span>{property.propertyName}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveProperty(property.id)}
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

                    <div className="flex justify-between mt-8">
                        <button
                            type="submit"
                            className="bg-black text-white py-2 px-2 rounded-none border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-300"
                        >
                            Save Changes
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
