const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/employees', employeeRoutes);

module.exports = app;
