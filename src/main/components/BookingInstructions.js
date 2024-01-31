import React from "react";

const BookingInstructions = () => {
    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Booking Instructions:</h2>
            <ol className="list-decimal ml-6">
                <li className="mb-4">
                    <strong>Downpayment:</strong>
                    <p className="ml-4">
                        Send a 50 pesos downpayment to GCash:{" "}
                        <strong>0934-594-7594</strong>.
                    </p>
                </li>
                <li className="mb-4">
                    <strong>Proof of Payment:</strong>
                    <p className="ml-4">
                        Share payment proof on Messenger:{" "}
                        <a
                            href="[Your Messenger Link]"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            Your Messenger Link
                        </a>
                        .
                    </p>
                </li>
                <li className="mb-4">
                    <strong>Confirmation:</strong>
                    <p className="ml-4">
                        Once confirmed, you'll receive a notification.
                    </p>
                </li>
            </ol>
            <div className="mt-4">
                <strong className="block mb-2">Notes:</strong>
                <ul className="list-disc ml-6">
                    <li>Downpayment is non-refundable.</li>
                    <li>Ensure clear payment proof.</li>
                </ul>
            </div>
            <p className="mt-4">Thank you! We're excited to serve you!</p>
        </div>
    );
};

export default BookingInstructions;
