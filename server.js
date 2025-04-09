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

// Middleware
app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/graph', graphRouter);

// Start HTTPS server
https.createServer({ key, cert }, app).listen(port, () => {
  console.log(`🚀 HTTPS server running at https://localhost:${port}`);
});