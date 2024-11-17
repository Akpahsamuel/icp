import React, { useState } from "react";
import { healthActor, Principal } from "../services/icpAgent";

const ReadRecord = () => {
    const [principal, setPrincipal] = useState("");
    const [record, setRecord] = useState(null);

    const handleRead = async () => {
        try {
            const result = await healthActor.read_record(Principal.fromText(principal));
            setRecord(result);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch record.");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Read Health Record</h2>
            <input
                className="block w-full border border-gray-300 rounded-lg p-2 mb-3"
                type="text"
                placeholder="Principal ID"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
            />
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={handleRead}
            >
                Read Record
            </button>
            {record && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Record Details</h3>
                    <p><strong>Patient Name:</strong> {record.patient_name}</p>
                    <p><strong>Age:</strong> {record.age}</p>
                    <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                    <p><strong>Treatment:</strong> {record.treatment}</p>
                </div>
            )}
        </div>
    );
};

export default ReadRecord;
