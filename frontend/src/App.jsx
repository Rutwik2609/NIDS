
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    attack: 0,
    count: '',
    dst_host_diff_srv_rate: '',
    dst_host_same_src_port_rate: '',
    dst_host_same_srv_rate: '',
    dst_host_srv_count: '',
    flag: 0,
    last_flag: '',
    logged_in: '',
    same_srv_rate: '',
    serror_rate: '',
    service_http: 0,
  });
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction('');

    try {
      // Validate input types
      const payload = {
        ...formData,
        logged_in: parseInt(formData.logged_in),
        count: parseFloat(formData.count),
        dst_host_diff_srv_rate: parseFloat(formData.dst_host_diff_srv_rate),
        dst_host_same_src_port_rate: parseFloat(formData.dst_host_same_src_port_rate),
        dst_host_same_srv_rate: parseFloat(formData.dst_host_same_srv_rate),
        dst_host_srv_count: parseFloat(formData.dst_host_srv_count),
        last_flag: parseFloat(formData.last_flag),
        same_srv_rate: parseFloat(formData.same_srv_rate),
        serror_rate: parseFloat(formData.serror_rate),
      };

      // Validate numerical fields
      const numericalFields = [
        'count', 'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate',
        'dst_host_same_srv_rate', 'dst_host_srv_count', 'last_flag',
        'same_srv_rate', 'serror_rate', 'logged_in'
      ];

      numericalFields.forEach(field => {
        if (isNaN(payload[field])) {
          throw new Error(`Invalid value for ${field}`);
        }
      });

      // Validate binary fields
      if (payload.logged_in !== 0 && payload.logged_in !== 1) {
        throw new Error('logged_in must be 0 or 1');
      }

      const response = await axios.post('http://localhost:5000/predict', payload);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setPrediction(response.data.output);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <h1 style={{ color: 'blue' }}>Network Intrusion Detection System</h1>

  
      <form onSubmit={handleSubmit}>
        {/* Attack Type Dropdown */}
        <div className="form-group">
          <label>Attack Type:</label>
          <select
            name="attack"
            value={formData.attack}
            onChange={handleSelectChange}
          >
            <option value={0}>Other</option>
            <option value={1}>neptune</option>
            <option value={2}>normal</option>
            <option value={3}>satan</option>
          </select>
        </div>

        {/* Connection Flag Dropdown */}
        <div className="form-group">
          <label>Connection Flag:</label>
          <select
            name="flag"
            value={formData.flag}
            onChange={handleSelectChange}
          >
            <option value={0}>Other</option>
            <option value={1}>S0</option>
            <option value={2}>SF</option>
          </select>
        </div>

        {/* Last Flag Input */}
        <div className="form-group">
          <label>Last Flag Value:</label>
          <input
            type="number"
            step="0.01"
            name="last_flag"
            value={formData.last_flag}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Other numeric inputs */}
        {[
          'count',
          'dst_host_diff_srv_rate',
          'dst_host_same_src_port_rate',
          'dst_host_same_srv_rate',
          'dst_host_srv_count',
          'logged_in',
          'same_srv_rate',
          'serror_rate'
        ].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.replace(/_/g, ' ').toUpperCase()}:</label>
            <input
              type="number"
              step={field === 'logged_in' ? '1' : '0.01'}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              required
            />
          </div>
        ))}

        {/* Service HTTP Dropdown */}
        <div className="form-group">
          <label>HTTP Service:</label>
          <select
            name="service_http"
            value={formData.service_http}
            onChange={handleSelectChange}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        <button type="submit">Predict</button>
      </form>

      {error && <div className="error">{error}</div>}
      {prediction && (
        <h3>
          Attack Class should be <span style={{ color: 'red' }}>{prediction}</span>
        </h3>
      )}
    </div>
  );
}

export default App;