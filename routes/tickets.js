const express = require('express');
const { getTickets, createTicket, updateTicket } = require('../controllers/tickets');
const router = express.Router();

app.get('/tickets', getTickets);

app.post('/tickets', createTicket);

app.put('/tickets/:id', updateTicket);

module.exports = router;
