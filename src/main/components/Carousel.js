import { Button } from "@nextui-org/react";
import React, { useState } from "react";

const Carousel = ({ cards }) => {
    const [step, setStep] = useState(1);
    return (
        <div className="flex">
            <Button onPress={() => setStep(step - 1)}>.</Button>
            <div className={`translate w-[300px] h-[400px] mx-auto overflow-hidden bg-green-400`}>
                <div className="bg-red-500 flex">
                    {cards.map((card) => card)}
                </div>
            </div>
            <Button onPress={() => setStep(step + 1)}>.</Button>
        </div>
    );
};

export default Carousel;
