const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/activity', require('./routes/activityRoutes'));
app.use('/emission', require('./routes/emissionRoutes'));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: "Server is up and running" });
});

const PORT = process.env.PORT || 3737;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

