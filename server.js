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


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});