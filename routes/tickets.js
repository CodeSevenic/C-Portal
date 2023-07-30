const express = require('express');
const { getTickets, createTicket, updateTicket } = require('../controllers/tickets');
const router = express.Router();

router.get('/tickets', getTickets);

router.post('/tickets', createTicket);

router.put('/tickets/:id', updateTicket);

module.exports = router;
