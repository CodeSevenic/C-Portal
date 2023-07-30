const express = require('express');
const {
  getTickets,
  createTicket,
  updateTicket,
  getTicketsByOwnerEmail,
  getTicketsByContactEmail,
} = require('../controllers/tickets');
const router = express.Router();

router.get('/tickets', getTicketsByContactEmail);

router.post('/tickets', createTicket);

router.put('/tickets/:id', updateTicket);

module.exports = router;
