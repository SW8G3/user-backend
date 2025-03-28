const express = require('express');
const router = express.Router();

const graph = require('../controller/graph');

router.get('/route', graph.getRoute);

router.get('/direction', graph.getDirectionPhoto);

router.get('/search', graph.searchWithTag);

module.exports = router;