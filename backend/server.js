import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import authRouter from './routes/auth.js';
import connectMongo from './models/connection.js';
import homeRouter from './routes/home.js';
import cookieParser from 'cookie-parser';
await connectMongo();

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://auth-1-gw9t.onrender.com",
  credentials: true  // CRITICAL: Allows cookies // to recieve cookies from the frontend (it needs a specified origin)
}));
app.use(cookieParser()) // for stroing the jwt token in a cookie


app.use('/auth', authRouter)
app.use('/home', homeRouter)

app.get("/api/health", (req, res) => {
  res.status(200).send("Server is alive!");
});
app.use((req, res) => {res.status(404).json({message: 'Endpoint not found'})})
// this way this handles the async errors also 
const server = app.listen(PORT, () => {
  console.log(`Server connected on PORT: ${PORT}`);
});

server.on('error', (error) => {
  console.error('Server connection error:', error);
});



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const config = require('./config');
// const authRoutes = require('./routes/auth');

// const app = express();

// app.use(express.json());
// app.use(cors());

// mongoose.connect(config.mongoURI, { useNewUrlParser: true, 
//                                     useUnifiedTopology: true })
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.error(err));

// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));