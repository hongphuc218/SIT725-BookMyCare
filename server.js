const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://BookMyCare:BMCPassword@bookmycare.w4x7e.mongodb.net/?retryWrites=true&w=majority&appName=BookMyCare', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Import routes (Ensure all use `/api`)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

// Set a consistent port (Frontend & Backend should use the same)
const PORT = 5000;  // ✅ Now using 5000 consistently
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
