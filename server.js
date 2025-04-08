const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;


const graphRouter = require('./router/graph');


app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/graph', graphRouter);


app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://10.92.0.113:${port}`);
  });