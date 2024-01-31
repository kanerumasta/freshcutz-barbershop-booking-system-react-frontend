import React, { useState } from "react";

const AddServiceForm = ({ onClose, onAddService }) => {
    const [serviceName, setServiceName] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");

    const handleAddService = () => {
        // You can perform any validation here before adding the service
        const newService = {
            name: serviceName,
            description: serviceDescription,
            // You can include additional fields or modify as per your data model
        };

        onAddService(newService);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Service Name
                    </label>
                    <input
                        type="text"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Service Description
                    </label>
                    <textarea
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full focus:outline-none"
                        onClick={handleAddService}
                    >
                        Add Service
                    </button>
                    <button
                        className="ml-4 text-gray-600 hover:text-gray-800 py-2 px-4 rounded-full focus:outline-none"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddServiceForm;
