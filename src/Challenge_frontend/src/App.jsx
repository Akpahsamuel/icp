import React from "react";
import CreateRecord from "./components/CreateRecord";
import ReadRecord from "./components/ReadRecord";
import UpdateRecord from "./components/UpdateRecord";
import DeleteRecord from "./components/DeleteRecord";
import 'globalthis/auto';


function App() {
  if (typeof global === "undefined") {
    window.global = {};
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Health Records Management
        </h1>
        <p className="text-gray-600">
          Easily manage patient records with our secure platform.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-10 max-w-5xl mx-auto">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <CreateRecord />
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <ReadRecord />
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <UpdateRecord />
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <DeleteRecord />
        </div>
      </div>
    </div>
  );
}

export default App;
