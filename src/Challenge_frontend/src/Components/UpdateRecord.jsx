import React, { useState } from "react";
import { healthActor } from "../services/icpAgent";

const UpdateRecord = () => {
    const [form, setForm] = useState({
        patient_name: "",
        age: "",
        diagnosis: "",
        treatment: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const result = await healthActor.update_record({
                ...form,
                age: Number(form.age),
            });
            if (result.ok) {
                setMessage(result.ok);
            } else {
                setMessage(result.err);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to update record.");
        }
    };

    return (
        <div>
            <h2>Update Health Record</h2>
            <input name="patient_name" placeholder="Patient Name" onChange={handleChange} />
            <input name="age" type="number" placeholder="Age" onChange={handleChange} />
            <input name="diagnosis" placeholder="Diagnosis" onChange={handleChange} />
            <input name="treatment" placeholder="Treatment" onChange={handleChange} />
            <button onClick={handleUpdate}>Update Record</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateRecord;
