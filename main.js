const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection setup
let cachedDb = null;
const mongoURI = 'mongodb+srv://devgandhi100:god@cluster0.xu0mi.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }
    try {
        const client = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        cachedDb = client.connection.db;
        console.log('MongoDB connected successfully');
        return cachedDb;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

// Route imports
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

// API routes setup
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Health check endpoint
app.get('/api/v1', (req, res) => {
    res.status(200).json({ message: 'API is working properly' });
});

app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1><p>Testing Page</p>');
});

// Wrap the app with the connection logic for serverless
module.exports = async (req, res) => {
    await connectToDatabase();
    app(req, res);
};
