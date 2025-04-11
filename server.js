const express = require('express');
const cors = require('cors');

const app = express();
const port = 3002;

const graphRouter = require('./router/graph');


const corsOptions = {
  origin: 'https://10.92.0.113:5173', // Ensure this matches your frontend's HTTPS URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies and credentials if needed
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


app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
