import React, { useState } from "react";
import { healthActor } from "../services/icpAgent";

const CreateRecord = () => {
    const [form, setForm] = useState({
        patient_name: "",
        age: "",
        diagnosis: "",
        treatment: "",
        record_date: "", // Date field added
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            // Convert record_date to nanoseconds (Nat64-compatible)
            const recordDate = new Date(form.record_date).getTime() * 1_000_000;

            await healthActor.create_record({
                ...form,
                age: Number(form.age), // Convert age to a number
                record_date: recordDate, // Send record_date as Nat64 (nanoseconds)
            });

            setMessage("Record created successfully!");
            setForm({
                patient_name: "",
                age: "",
                diagnosis: "",
                treatment: "",
                record_date: "",
            });
        } catch (err) {
            console.error(err);
            setMessage("Failed to create record. Please try again.");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Create Health Record</h2>
            <input
                className="block w-full border border-gray-300 rounded-lg p-2 mb-3"
                name="patient_name"
                placeholder="Patient Name"
                value={form.patient_name}
                onChange={handleChange}
            />
            <input
                className="block w-full border border-gray-300 rounded-lg p-2 mb-3"
                name="age"
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
            />
            <input
                className="block w-full border border-gray-300 rounded-lg p-2 mb-3"
                name="diagnosis"
                placeholder="Diagnosis"
                value={form.diagnosis}
                onChange={handleChange}
            />
            <input
                className="block w-full border border-gray-300 rounded-lg p-2 mb-3"
                name="treatment"
                placeholder="Treatment"
                value={form.treatment}
                onChange={handleChange}
            />
            <input
                className="block w-full border border-gray-300 rounded-lg p-2 mb-3"
                name="record_date"
                type="date" // Use a date picker for better UX
                value={form.record_date}
                onChange={handleChange}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={handleSubmit}
            >
                Create Record
            </button>
            {message && <p className="mt-3 text-green-500">{message}</p>}
        </div>
    );
};

export default CreateRecord;
