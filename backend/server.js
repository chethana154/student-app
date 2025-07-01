const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => res.send('Student API is up and running!'));

app.use('/api/auth', authRoutes);

// 404 fallback
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
