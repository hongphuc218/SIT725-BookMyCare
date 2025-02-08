const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors()); // Enable CORS to allow frontend requests
app.use(express.json()); // Enable JSON parsing for API requests

// MongoDB Connection (Ensure correct database name is used)
mongoose.connect('mongodb+srv://BookMyCare:BMCPassword@bookmycare.w4x7e.mongodb.net/hospital_system?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`, req.body);
    next();
});

// Import routes (Ensure all use `/api`)
app.use('/api/auth', require('./routes/authRoutes')); 
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

const PORT = 5000;  // ✅ Using 5000 consistently
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
