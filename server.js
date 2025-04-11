const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
const port = 3002;

const graphRouter = require('./router/graph');


// SSL certificate and key from mkcert
const key = fs.readFileSync(path.join(__dirname, 'localhost+2-key.pem'));
const cert = fs.readFileSync(path.join(__dirname, 'localhost+2.pem'));


const corsOptions = {
    origin: 'http://10.92.0.113:5173',  // Allow requests from the frontend (which is running on this IP and port)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

// Middleware
app.use(cors(corsOptions));
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/graph', graphRouter);

// Start HTTPS server
https.createServer({ key, cert }, app).listen(port, '0.0.0.0', () => {
  console.log(`🚀 HTTPS server running at https://localhost:${port}`);
});
