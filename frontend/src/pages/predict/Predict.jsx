import { useState } from "react";
import axios from "axios";
import "./App.css";

const PredictPage = () => {
  const [formData, setFormData] = useState({
    attack: 0,
    count: "",
    dst_host_diff_srv_rate: "",
    dst_host_same_src_port_rate: "",
    dst_host_same_srv_rate: "",
    dst_host_srv_count: "",
    flag: 0,
    last_flag: "",
    logged_in: "",
    same_srv_rate: "",
    serror_rate: "",
    service_http: 0,
  });

  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction("");

    try {
      const payload = {
        ...formData,
        count: parseFloat(formData.count),
        dst_host_diff_srv_rate: parseFloat(formData.dst_host_diff_srv_rate),
        dst_host_same_src_port_rate: parseFloat(formData.dst_host_same_src_port_rate),
        dst_host_same_srv_rate: parseFloat(formData.dst_host_same_srv_rate),
        dst_host_srv_count: parseInt(formData.dst_host_srv_count),
        last_flag: parseFloat(formData.last_flag),
        same_srv_rate: parseFloat(formData.same_srv_rate),
        serror_rate: parseFloat(formData.serror_rate),
        logged_in: parseInt(formData.logged_in),
      };

      const response = await axios.post("http://localhost:5000/api/v1/predict/result", payload);
      setPrediction(response.data.output);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login w-screen h-screen flex flex-col justify-between items-center ">
      <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center">
        Network Intrusion Detection System
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <div className="form-group flex flex-col">
          <label>Attack Type:</label>
          <select name="attack" value={formData.attack} onChange={handleInputChange}>
            <option value={0}>Other</option>
            <option value={1}>Neptune (DOS)</option>
            <option value={2}>Normal</option>
            <option value={3}>Satan (Attack)</option>
          </select>
        </div>

        <div className="form-group flex flex-col">
          <label>Count (0 - 100000):</label>
          <input
            type="number"
            name="count"
            value={formData.count}
            onChange={handleInputChange}
            min="0"
            max="100000"
            placeholder="Enter value between 0 - 100000"
            required
          />
        </div>

        <div className="form-group flex flex-col">
          <label>dst_host_diff_srv_rate (0.0 - 1.0):</label>
          <input
            type="number"
            step="0.01"
            name="dst_host_diff_srv_rate"
            value={formData.dst_host_diff_srv_rate}
            onChange={handleInputChange}
            min="0"
            max="1"
            placeholder="Enter value between 0.0 - 1.0"
            required
          />
        </div>

        <div className="form-group flex flex-col">
          <label>dst_host_same_src_port_rate (0.0 - 1.0):</label>
          <input
            type="number"
            step="0.01"
            name="dst_host_same_src_port_rate"
            value={formData.dst_host_same_src_port_rate}
            onChange={handleInputChange}
            min="0"
            max="1"
            placeholder="Enter value between 0.0 - 1.0"
            required
          />
        </div>

        <div className="form-group flex flex-col">
          <label>dst_host_same_srv_rate (0.0 - 1.0):</label>
          <input
            type="number"
            step="0.01"
            name="dst_host_same_srv_rate"
            value={formData.dst_host_same_srv_rate}
            onChange={handleInputChange}
            min="0"
            max="1"
            placeholder="Enter value between 0.0 - 1.0"
            required
          />
        </div>

        <div className="form-group flex flex-col">
          <label>dst_host_srv_count (0 - 255):</label>
          <input
            type="number"
            name="dst_host_srv_count"
            value={formData.dst_host_srv_count}
            onChange={handleInputChange}
            min="0"
            max="255"
            placeholder="Enter value between 0 - 255"
            required
          />
        </div>

        <div className="form-group flex flex-col">
          <label>Last Flag (0.0 - 1.0):</label>
          <input
            type="number"
            step="0.01"
            name="last_flag"
            value={formData.last_flag}
            onChange={handleInputChange}
            min="0"
            max="1"
            placeholder="Enter value between 0.0 - 1.0"
            required
          />
        </div>

        <div className="form-group flex flex-col">
          <label>Logged In (0 or 1):</label>
          <select name="logged_in" value={formData.logged_in} onChange={handleInputChange}>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        <div className="form-group flex flex-col">
          <label>Same Service Rate (0.0 - 1.0):</label>
          <input
            type="number"
            step="0.01"
            name="same_srv_rate"
            value={formData.same_srv_rate}
            onChange={handleInputChange}
            min="0"
            max="1"
            placeholder="Enter value between 0.0 - 1.0"
            required
          />
        </div>

        <div className="form-group flex flex-col">
          <label>Serror Rate (0.0 - 1.0):</label>
          <input
            type="number"
            step="0.01"
            name="serror_rate"
            value={formData.serror_rate}
            onChange={handleInputChange}
            min="0"
            max="1"
            placeholder="Enter value between 0.0 - 1.0"
            required
          />
        </div>

        <div className="form-group flex flex-col">
          <label>Service HTTP (0 or 1):</label>
          <select name="service_http" value={formData.service_http} onChange={handleInputChange}>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        {/* Button container */}
        <div className="flex justify-center mt-auto mb-5 gap-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32"
          >
            Predict
          </button>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-32"
            onClick={() => window.location.href = '/'}
          >
           back
          </button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}
      {prediction && <h3>Attack Class: <span style={{ color: "red" }}>{prediction}</span></h3>}
    </div>
  );
};

export default PredictPage;
