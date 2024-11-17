import React, { useState } from "react";
import { healthActor, Principal } from "../services/icpAgent";

const DeleteRecord = () => {
    const [principal, setPrincipal] = useState("");
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        try {
            const result = await healthActor.delete_record(Principal.fromText(principal));
            if (result.ok) {
                setMessage("Record deleted successfully!");
            } else {
                setMessage(result.err);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to delete record.");
        }
    };

    return (
        <div>
            <h2>Delete Health Record</h2>
            <input
                type="text"
                placeholder="Principal ID"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
            />
            <button onClick={handleDelete}>Delete Record</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteRecord;
