const express = require('express');
const router = express.Router();

const graph = require('../controller/graph');

router.post('/route', graph.getRoute);

router.post('/direction', graph.getDirectionPhoto);

router.post('/search', graph.searchWithTag);

router.post('/node', graph.getNodeFromId);

module.exports = router;