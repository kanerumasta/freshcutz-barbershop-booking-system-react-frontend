import React, { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { useServicesQuery } from "../../services/api";
import Loading from "../components/Loading";
import ServiceStyles from "../../admin/pages/ServiceStyles";

const Services = () => {
    const isDark = true;
    const [selectedService, setSelectedService] = useState(null);
    const servicesQuery = useServicesQuery();
    if (servicesQuery.isLoading) return <Loading />;
    return (
        <div className=" py-[40px] min-h-[calc(100vh-60px)]">
            <div className="capitalize text-white text-3xl font-bold mb-10 flex justify-center">
                services
            </div>

            <div
                className={`mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:px-10`}
            >
                {servicesQuery.data.map((service, index) => (
                    <div
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`p-4 transition duration-300 transform hover:scale-105 ${
                            isDark ? "bg-gray-800" : "bg-white"
                        } rounded-lg flex space-x-4 overflow-hidden shadow-md cursor-pointer`}
                    >
                        {service.styles[0]?.image && (
                            <img
                                src={service.styles[0]?.image}
                                alt={service.name}
                                className="mt-2 rounded-lg max-w-full h-auto"
                                style={{ maxWidth: "100%", maxHeight: "200px" }}
                            />
                        )}
                        <div className="">
                            <h3
                                className={`font-bold uppercase text-xl mb-2 ${
                                    isDark ? "text-white" : "text-black"
                                }`}
                            >
                                {service.name}
                            </h3>
                            <h2 className="capitalize text-white/70 text-md">
                                {service.description}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="md:px-10">
                <div className=" text-white font-bold text-2xl capitalize flex justify-center my-6">
                    styles
                </div>
                {selectedService && (
                    <ServiceStyles
                        hasButton={false}
                        isDark={isDark}
                        styles={selectedService.styles}
                    />
                )}
            </div>
        </div>
    );
};

export default Services;
