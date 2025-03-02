const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});


// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
        body: req.body,
        query: req.query,
        params: req.params
    });
    next();
});

app.use((req, res, next) => {
    const oldJson = res.json;
    res.json = function(data) {
        console.log('Response:', {
            path: req.path,
            method: req.method,
            responseData: data
        });
        return oldJson.apply(res, arguments);
    };
    next();
});
app.use((req, res, next) => {
    if (req.path.includes('/appointments')) {
        console.log('Appointment request:', {
            method: req.method,
            path: req.path,
            body: req.body,
            headers: req.headers
        });
    }
    next();
});

// Routes
const userRoutes = require('./routes/users');
const appointmentRoutes = require('./routes/appointments');

app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});