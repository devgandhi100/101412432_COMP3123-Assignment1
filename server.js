const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://devgandhi100:god@cluster0.xu0mi.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

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
    res.send('<h1>Welcome  </h1><p>Testing Page</p>');
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
