import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./idl";
import { Principal } from "@dfinity/principal";

// Use environment variable for the canister ID
const canisterId = 'be2us-64aaa-aaaaa-qaabq-cai';

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" }); // Use local host for development

// Create an actor for backend calls
const healthActor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
});

export { healthActor, Principal };
