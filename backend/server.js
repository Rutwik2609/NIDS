import express from 'express';
import cors from 'cors';
import {spawn} from 'child_process';
import morgan from 'morgan';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.post('/predict', (req, res) => {
    try {
        const data = req.body;
        
        // Validate input fields
        if (!data) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const pythonProcess = spawn('python', ['predict.py', JSON.stringify(data)]);

        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Prediction failed' });
            }
            res.json(JSON.parse(result));
        });
    } catch (error) {
        console.log('Error:', error);
        
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
