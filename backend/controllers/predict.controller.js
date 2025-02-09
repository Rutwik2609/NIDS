import { spawn } from 'child_process';
import path from 'path';
import Feature from '../models/features.model.js';

export const predictController = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const pythonScriptPath = path.join('D:', 'INTRUSION', 'nids', 'backend', 'predict.py');
        const pythonProcess = spawn('python', [pythonScriptPath, JSON.stringify(data)]);

        let result = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        pythonProcess.on('close', async (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Prediction failed' });
            }

            try {
                const predictionResult = JSON.parse(result); // Parse prediction result

                // Save features and prediction result
                await saveFeatureToDB({ ...req.body, prediction: predictionResult.output });

                // Send final response (only once)
                res.status(200).json(predictionResult);
            } catch (error) {
                console.error('Error saving to DB:', error);
                res.status(500).json({ error: 'Database save failed' });
            }
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

const saveFeatureToDB = async (featureData) => {
    try {
        const newFeature = new Feature(featureData);
        await newFeature.save();
    } catch (error) {
        console.error('Database save error:', error);
    }
};
