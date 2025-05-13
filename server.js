const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
const port = process.env.PORT | 3002;
const host = process.env.HOST || 'localhost';

const graphRouter = require('./router/graph');


// SSL certificate and key from mkcert
const key = fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem'));
const cert = fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'));

const corsOptions = {
  origin: ['https://10.92.0.113:5173', 'https://localhost:5173'],  // your frontend's full HTTPS origin (no trailing slash)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,  // only if you're using cookies or sessions
};

// Middleware
app.use(cors(corsOptions));
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/graph', graphRouter);

// Start HTTPS server
https.createServer({ key, cert }, app).listen(port, host, () => {
  console.log(`🚀 HTTPS server running at https://${host}:${port}`);
});
