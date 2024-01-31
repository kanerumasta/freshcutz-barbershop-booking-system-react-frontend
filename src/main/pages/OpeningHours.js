import React from "react";

const OpeningHours = () => {
    return (
        <div className=" backdrop-blur-[2px] h-screen bg-wallpaper  bg-no-repeat bg-cover bg-center">
            <div className="backdrop-blur-[5px] pt-14 bg-black/50 w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center h-[90%] w-[90%] lg:w-[50%] border-3 border-solid border-white bg-black/50 pb-3 rounded-md">
                    <div className="w-[200px] h-[200px] bg-logo bg-no-repeat bg-cover bg-center"></div>
                    <div className="lg:w-[60%] w-[80%] flex flex-col items-center">
                        <div className="text-white uppercase font-bold text-7xl lg:text-8xl mb-6">
                            open
                        </div>
                        <div className="w-full border-2 border-white mb-6"></div>
                        <div className="uppercase font-bold md:text-3xl text-2xl text-white">
                            monday to friday
                        </div>
                        <div className="uppercase font-bold md:text-lg text-md text-white mb-6">
                            8:30am - 6:00pm
                        </div>
                        <div className="w-full border-2 border-white mb-6"></div>
                        <div className="uppercase font-bold md:text-3xl text-2xl text-white">
                            saturday
                        </div>
                        <div className="uppercase font-bold md:text-lg text-md text-white mb-6">
                            8:30am - 6:00pm
                        </div>
                        <div className="uppercase font-bold md:text-3xl text-2xl text-white">
                            sunday
                        </div>
                        <div className="uppercase font-bold md:text-lg text-md text-white">
                            closed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpeningHours;
