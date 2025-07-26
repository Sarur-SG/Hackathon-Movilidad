const express = require('express');
const router = express.Router();
const Stop = require('../models/Stop');

// Obtener todas las paradas
router.get('/', async (req, res) => {
  const stops = await Stop.find();
  res.json(stops);
});

module.exports = router;
