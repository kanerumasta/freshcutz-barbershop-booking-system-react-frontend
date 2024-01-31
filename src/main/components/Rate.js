import { Textarea } from "@nextui-org/react";
import React from "react";
import { PiStarBold, PiStarFill } from "react-icons/pi";


const Rate = ({ comment, rate, setRate, setComment }) => {
    return (
        <div>
            <div>Rate Our Service</div>
            <div>
                <div className="flex items-center justify-center">
                    {rate > 0 ? (
                        <PiStarFill
                            size={60}
                            color="#fed102"
                            onClick={() => setRate(1)}
                        />
                    ) : (
                        <PiStarBold
                            size={60}
                            color="#fed102"
                            onClick={() => setRate(1)}
                        />
                    )}
                    {rate > 1 ? (
                        <PiStarFill
                            size={60}
                            color="#fed102"
                            onClick={() => setRate(2)}
                        />
                    ) : (
                        <PiStarBold
                            size={60}
                            color="#fed102"
                            onClick={() => setRate(2)}
                        />
                    )}
                    {rate > 2 ? (
                        <PiStarFill
                            size={60}
                            color="#fed102"
                            onClick={() => setRate(3)}
                        />
                    ) : (
                        <PiStarBold
                            size={60}
                            color="#fed102"
                            onClick={() => setRate(3)}
                        />
                    )}
                    {rate > 3 ? (
                        <PiStarFill
                            size={60}
                            color="#fed102"
                            onClick={() => setRate(4)}
                        />
                    ) : (
                        <PiStarBold
                            size={60}
                            color="#fed102"
                            onClick={() => setRate(4)}
                        />
                    )}
                    {rate > 4 ? (
                        <PiStarFill
                            size={60}
                            color="#fed102"
                            onClick={() => setRate(5)}
                        />
                    ) : (
                        <PiStarBold
                            size={60}
                            color="#fed102"
                            onClick={() => setRate(5)}
                        />
                    )}
                </div>
            </div>

            <Textarea
                value={comment}
                onValueChange={setComment}
                label="You can type you comment here.."
            />
        </div>
    );
};

export default Rate;
