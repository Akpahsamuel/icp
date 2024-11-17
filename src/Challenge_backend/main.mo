import Hashmap "mo:base/HashMap";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Principal "mo:base/Principal";

actor {

  public type Time = Time.Time;

  // Defining the structure of a Health Record
  public type HealthRecord = {
    patient_name : Text;
    age : Nat;
    diagnosis : Text;
    treatment : Text;
    record_date : Time;
  };

  // HashMap to store health records:
  // Key = Principal (representing the patient), Value = HealthRecord
  let healthRecords : Hashmap.HashMap<Principal, HealthRecord> = Hashmap.HashMap<Principal, HealthRecord>(0, Principal.equal, Principal.hash);

  // CRUD operations:

  // Creating a new health record
  public shared ({ caller }) func create_record(record : HealthRecord) : async () {
    healthRecords.put(caller, record);
    return;
  };

  // Reading an existing health record by Principal
  public query func read_record(principal : Principal) : async ?HealthRecord {
    return healthRecords.get(principal);
  };

  // Update an existing health record (if it exists)
  public shared ({ caller }) func update_record(record : HealthRecord) : async Result.Result<Text, Text> {
    switch (healthRecords.get(caller)) {
      case (null) return #err("No health record found for patient with Principal: " # Principal.toText(caller));
      case (?_) {
        healthRecords.put(caller, record);
        return #ok("Health record updated for patient with Principal: " # Principal.toText(caller));
      };
    };
  };

  // Delete a health record by Principal
  public shared ({ caller }) func delete_record(principal : Principal) : async Result.Result<(), Text> {
    switch (healthRecords.remove(principal)) {
      case (null) {
        return #err("No health record found for Principal: " # Principal.toText(principal));
      };
      case (?_) {
        return #ok();
      };
    };
  };

  // Test function
  public shared ({ caller }) func test() : async Text {
    return "Test passed";
  };

};
