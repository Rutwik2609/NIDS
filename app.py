import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model = joblib.load('model.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)  # Force JSON parsing
        
        # Extract features in correct order
        attack = int(data['attack'])
        count = float(data['count'])
        dst_host_diff_srv_rate = float(data['dst_host_diff_srv_rate'])
        dst_host_same_src_port_rate = float(data['dst_host_same_src_port_rate'])
        dst_host_same_srv_rate = float(data['dst_host_same_srv_rate'])
        dst_host_srv_count = float(data['dst_host_srv_count'])
        flag = int(data['flag'])
        last_flag = float(data['last_flag'])
        logged_in = int(data['logged_in'])
        same_srv_rate = float(data['same_srv_rate'])
        serror_rate = float(data['serror_rate'])
        service_http = int(data['service_http'])

        # Feature transformation
        attack_encoding = (
            [1, 0, 0] if attack == 1 else
            [0, 1, 0] if attack == 2 else
            [0, 0, 1] if attack == 3 else
            [0, 0, 0]
        )
        
        flag_encoding = (
            [1, 0] if flag == 1 else
            [0, 1] if flag == 2 else
            [0, 0]
        )

        # Create feature array
        features = np.array([
            *attack_encoding,
            count,
            dst_host_diff_srv_rate,
            dst_host_same_src_port_rate,
            dst_host_same_srv_rate,
            dst_host_srv_count,
            *flag_encoding,
            last_flag,
            logged_in,
            same_srv_rate,
            serror_rate,
            service_http
        ]).reshape(1, -1)

        prediction = model.predict(features)[0]

        # Map prediction to label
        output_map = {
            0: 'Normal',
            1: 'DOS',
            2: 'PROBE',
            3: 'R2L',
            4: 'U2R'
        }
        output = output_map.get(prediction, 'Unknown')

        return jsonify({'output': output})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)