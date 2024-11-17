import Hashmap "mo:base/HashMap";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {

  public type Time = Time.Time;

  // Defining the structure of a Health Record
  public type HealthRecord = {
    patient_name : Text;
    age : Nat;
    diagnosis : Text;
    treatment : Text;
    record_date : Text;
  };

  // HashMap to store health records:
  // Key = Text (representing a unique record ID), Value = HealthRecord
  let healthRecords : Hashmap.HashMap<Text, HealthRecord> = Hashmap.HashMap<Text, HealthRecord>(0, Text.equal, Text.hash);

  // CRUD operations:

  // Creating a new health record
  public shared func create_record(record_id : Text, record : HealthRecord) : async Text {
    healthRecords.put(record_id, record);
    return "Welcome to decentralized records! Record created with ID: " # record_id;
  };

  // Reading an existing health record by record ID
  public query func read_record(record_id : Text) : async ?HealthRecord {
    return healthRecords.get(record_id);
  };

  // Update an existing health record (if it exists)
  public shared func update_record(record_id : Text, record : HealthRecord) : async Result.Result<Text, Text> {
    switch (healthRecords.get(record_id)) {
      case (null) return #err("No health record found for ID: " # record_id);
      case (?_) {
        healthRecords.put(record_id, record);
        return #ok("Health record updated for ID: " # record_id);
      };
    };
  };

  // Delete a health record by record ID
  public shared func delete_record(record_id : Text) : async Result.Result<(), Text> {
    switch (healthRecords.remove(record_id)) {
      case (null) {
        return #err("No health record found for ID: " # record_id);
      };
      case (?_) {
        return #ok();
      };
    };
  };

  // Test function
  public shared func test() : async Text {
    return "Test passed";
  };

};
