import React, { useEffect, useState } from "react";
import {
    useServicesQuery,
    useServicesMutation,
    useServiceStylesMutation,
} from "../../services/api";
import Loading from "../../main/components/Loading";
import { useSelector } from "react-redux";
import { selectIsDark } from "../../state/settingsSlice";
import ServiceStyles from "./ServiceStyles";
import AddServiceForm from "./AddServiceForm";
import AddServiceStyleForm from "./AddServiceStyleForm"; // Import your form component

const AdminServices = () => {
    const servicesQuery = useServicesQuery();
    const isDark = useSelector(selectIsDark);
    const [selectedService, setSelectedService] = useState(null);
    const [isAddingService, setIsAddingService] = useState(false);
    const [isAddingStyle, setIsAddingStyle] = useState(false);

    const servicesMutation = useServicesMutation();
    const serviceStylesMutation = useServiceStylesMutation();

    useEffect(() => {
        if (servicesQuery.isSuccess) console.log(servicesQuery.data);
    }, [servicesQuery.data]);

    if (servicesQuery.isLoading) return <Loading />;
    if (servicesQuery.isError) return <div>ERROR</div>;

    const handleAddService = async (newService) => {
        try {
            // Trigger the mutation to add the new service
            await servicesMutation.mutateAsync(newService);
            // Refetch the services data to update the list
            servicesQuery.refetch();
        } catch (error) {
            console.error("Error adding service:", error);
        } finally {
            setIsAddingService(false);
        }
    };

    const handleAddStyle = () => {
        try {
            // Trigger the mutation to add the new style
            setSelectedService(null);
            // Refetch the services data to update the styles list
            servicesQuery.refetch();
        } catch (error) {
            console.error("Error adding style:", error);
        } finally {
            setIsAddingStyle(false);
        }
    };

    const handleEditService = (service) => {
        // Add your logic to handle editing the selected service
        // For example, you can open a modal or navigate to an edit page
        console.log("Editing service:", service);
    };

    return (
        <div className={`container mx-auto mt-8 p-4 ${isDark ? "dark" : ""}`}>
            <h1
                className={`text-3xl font-semibold mb-4 ${
                    isDark ? "text-white" : "text-black"
                }`}
            >
                Services
            </h1>

            <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`}
            >
                {servicesQuery.data?.map((service) => (
                    <div
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`p-4 transition duration-300 transform hover:scale-105 ${
                            isDark ? "bg-gray-800" : "bg-white"
                        } rounded-lg overflow-hidden shadow-md cursor-pointer`}
                    >
                        <div className="p-6">
                            <h2
                                className={`uppercase text-xl font-semibold mb-2 ${
                                    isDark ? "text-white" : "text-black"
                                }`}
                            >
                                {service.name}
                            </h2>
                            <p
                                className={`text-gray-600 ${
                                    isDark ? "text-gray-300" : "text-gray-600"
                                }`}
                            >
                                {service.description}
                            </p>
                        </div>
                        <div
                            className={`p-6 ${
                                isDark ? "bg-gray-700" : "bg-gray-100"
                            } border-t border-gray-200`}
                        >
                            <button
                                className={`text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full focus:outline-none ${
                                    isDark ? "dark-btn" : ""
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditService(service);
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Display styles for the selected service */}
            {selectedService && (
                <ServiceStyles
                    isDark={isDark}
                    styles={selectedService.styles}
                    onAddStyleClick={() => setIsAddingStyle(true)}
                />
            )}

            {/* Add New Service Button */}
            <button
                className={`mt-8 text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded-full focus:outline-none ${
                    isDark ? "dark-btn" : ""
                }`}
                onClick={() => setIsAddingService(true)}
            >
                Add New Service
            </button>

            {/* Display the AddServiceForm when isAddingService is true */}
            {isAddingService && (
                <AddServiceForm
                    onClose={() => setIsAddingService(false)}
                    onAddService={handleAddService}
                />
            )}

            {/* Display the AddServiceStyleForm when isAddingStyle is true */}
            {isAddingStyle && (
                <AddServiceStyleForm
                    serviceId={selectedService.id}
                    onClose={() => {
                        setIsAddingStyle(false);
                        servicesQuery.refetch();
                    }}
                    onAddStyle={handleAddStyle}
                />
            )}
        </div>
    );
};

export default AdminServices;
