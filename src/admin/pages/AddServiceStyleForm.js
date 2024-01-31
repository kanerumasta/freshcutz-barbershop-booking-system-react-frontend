import React, { useState } from "react";
import { api, useServiceStylesMutation } from "../../services/api";
import { useSelector } from "react-redux";
import { selectIsDark } from "../../state/settingsSlice";

const AddServiceStyleForm = ({ serviceId, onAddStyle, onClose }) => {
    const isDark = useSelector(selectIsDark);
    const [image, setImage] = useState(null);
    const [styleData, setStyleData] = useState({
        name: "",

        service: serviceId,
        price: "",
    });

    const serviceStylesMutation = useServiceStylesMutation();

    const handleAddStyle = async () => {
        try {
            const formData = new FormData();
            formData.append("name", styleData.name);
            formData.append("service", styleData.service);
            formData.append("price", styleData.price);
            formData.append("image", image);

            for (const pair of formData.entries()) {
                console.log(`${pair[0]}--${pair[1]}`);
            }

            const newStyle = await serviceStylesMutation.mutateAsync(formData);
            onAddStyle();
        } catch (error) {
            console.error("Error adding service style:", error);
        } finally {
            onClose();
        }
    };

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Add New Style</h2>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={styleData.name}
                        onChange={(e) =>
                            setStyleData({ ...styleData, name: e.target.value })
                        }
                        className={`${
                            isDark && "text-white"
                        } mt-1 p-2 w-full border rounded-md`}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={styleData.price}
                        onChange={(e) =>
                            setStyleData({
                                ...styleData,
                                price: e.target.value,
                            })
                        }
                        className={`${
                            isDark && "text-white"
                        } mt-1 p-2 w-full border rounded-md`}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <button
                    onClick={handleAddStyle}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
                >
                    Add Style
                </button>
                <button
                    onClick={onClose}
                    className="ml-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddServiceStyleForm;
