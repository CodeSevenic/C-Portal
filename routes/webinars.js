const express = require('express');
const { fetchWebinars } = require('../controllers/webinars');
const router = express.Router();

router.get('/webinars', fetchWebinars);

module.exports = router;
