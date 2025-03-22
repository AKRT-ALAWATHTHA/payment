const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors')


const app = express();
app.use(express.json());
// Middleware

const connectDB = async () => {
    try {
        const MONGODB_URI = 'mongodb+srv://admin:HavestLanka123@havestlanka.f3kte.mongodb.net/DMFFAS?retryWrites=true&w=majority&appName=HavestLanka';
        if (!MONGODB_URI) {
            console.log('MongoDB URI not found in environment variables');
        }

        await mongoose.connect(MONGODB_URI,)
        console.log('Connected to MongoDB');
    }catch(error){
        console.log('Error connecting to MongoDB');
        console.log(error);
    }
}

connectDB();

// Define Schema & Model
const DataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true }
});
const DataModel = mongoose.model('Data', DataSchema);

// POST route to save data
app.post('/enter', async (req, res) => {
    try {
        const { name, score } = req.body;
        if (!name || score === undefined) {
            return res.status(400).json({ message: 'Name and score are required' });
        }
        
        const newData = new DataModel({ name, score });
        await newData.save();
        res.status(201).json({ message: 'Data saved successfully', data: newData });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

app.get('/' , (req,res) => {
    res.send('hello world');
})

// Start server
app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});