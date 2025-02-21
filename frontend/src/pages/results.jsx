import React, { useEffect, useState } from "react";
import axios from "axios";

const AttackRecords = () => {
  const [attackData, setAttackData] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    axios.get("http://localhost:5000/api/v1/result/view-result") // Change URL based on your backend
      .then((response) => {
        setAttackData(response.data); // Store data in state
      })
      .catch((error) => {
        console.error("Error fetching attack data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Attack Records</h1>

      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="table-auto w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-600 px-4 py-2">Prediction</th>
              <th className="border border-gray-600 px-4 py-2">Count</th>
              <th className="border border-gray-600 px-4 py-2">Flag</th>
              <th className="border border-gray-600 px-4 py-2">Service HTTP</th>
              <th className="border border-gray-600 px-4 py-2">Logged In</th>
              <th className="border border-gray-600 px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {attackData.map((attack, index) => (
              <tr key={index} className="bg-gray-800 hover:bg-gray-700">
                <td className="border border-gray-600 px-4 py-2">{attack.prediction}</td>
                <td className="border border-gray-600 px-4 py-2">{attack.count}</td>
                <td className="border border-gray-600 px-4 py-2">{attack.flag}</td>
                <td className="border border-gray-600 px-4 py-2">{attack.service_http ? "Yes" : "No"}</td>
                <td className="border border-gray-600 px-4 py-2">{attack.logged_in ? "Yes" : "No"}</td>
                <td className="border border-gray-600 px-4 py-2">{new Date(attack.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttackRecords;
