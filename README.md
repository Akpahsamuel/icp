# Decentralized Health Records System

The Decentralized Health Records System is a smart contract application built on the Internet Computer Protocol (ICP) using Motoko. It provides a decentralized and secure way to manage health records. The system allows users to create, read, update, and delete health records using unique identifiers, ensuring privacy and transparency.

## Features

- Decentralized Storage: All records are stored in a decentralized manner on the Internet Computer.
- CRUD Operations: Create new health records, read existing health records using a unique record ID, update existing records, and delete records.
- Automatic Persistence: Records are automatically persisted by the Internet Computer without requiring additional storage management.

## How It Works

Each health record is associated with a unique ID (record_id) that acts as the key. The records are stored in a HashMap structure within the canister. Orthogonal persistence ensures that the state of the system is automatically saved and restored across canister updates or reboots.

## Installation and Deployment

### Prerequisites

- Install the DFINITY SDK: [DFINITY Docs](https://sdk.dfinity.org/docs/index.html)
- Ensure `dfx` is installed and configured.

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Start the local Internet Computer replica:

   ```bash
   dfx start --background
   ```

3. Deploy the canister:

   ```bash
   dfx deploy Challenge_background
   ```

4. Interact with the Canister
   - Use the `dfx` commands or integrate with a front-end to call the smart contract methods.
  
5. Running frontend
   ```bash
   cd src
   cd Challenge_frontend
   npm install
   npm run dev

## API Reference

### Create a Record

```motoko
shared func create_record(record_id: Text, record: HealthRecord): async Text
```

Parameters:
- `record_id`: A unique identifier for the health record (Text).
- `record`: The health record object containing patient details.

Returns: Success message.

### Read a Record

```motoko
query func read_record(record_id: Text): async ?HealthRecord
```

Parameters:
- `record_id`: The unique identifier for the health record.

Returns: The health record object or null if not found.

### Update a Record

```motoko
shared func update_record(record_id: Text, record: HealthRecord): async Result.Result<Text, Text>
```

Parameters:
- `record_id`: The unique identifier for the health record.
- `record`: The updated health record object.

Returns: Result with success or error message.

### Delete a Record

```motoko
shared func delete_record(record_id: Text): async Result.Result<(), Text>
```

Parameters:
- `record_id`: The unique identifier for the health record.

Returns: Result with success or error message.

### Health Record Structure

```motoko
type HealthRecord = {
  patient_name: Text;
  age: Nat;
  diagnosis: Text;
  treatment: Text;
  record_date: Time;
};
```

## Example Usage

### Creating a Record

```motoko
await create_record("record123", {
  patient_name = "John Doe";
  age = 35;
  diagnosis = "Flu";
  treatment = "Rest and fluids";
  record_date = 20/12/24;
});
```

### Reading a Record

```motoko
let record = await read_record("record123");
```

### Updating a Record

```motoko
await update_record("record123", {
  patient_name = "John Doe";
  age = 36;
  diagnosis = "Flu";
  treatment = "Medications and rest";
  record_date = 27/12/24;
});
```

### Deleting a Record

```motoko
await delete_record("record123");
```

## Contributing

Contributions are welcome! Please create an issue or submit a pull request to propose changes or report bugs.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact


Enjoy decentralized and secure management of health records with this application!
