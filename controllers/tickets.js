const axios = require('axios');

console.log('process.env.HUBSPOT_API_KEY: ', process.env.HUBSPOT_API_KEY);

exports.getTickets = async (req, res) => {
  console.log('Request has been made to get tickets');
  try {
    const response = await axios.get('https://api.hubapi.com/crm/v3/objects/tickets', {
      params: {
        limit: 100,
        archived: false,
      },
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
    });

    // Filter the tickets that belong to 'support_pipeline'
    const supportTickets = response.data.results.filter(
      (ticket) => ticket.properties.hs_pipeline === '46085271'
    );

    console.log('Filtered support tickets: ', supportTickets);
    res.send({ results: supportTickets });
  } catch (error) {
    console.error('Error fetching tickets: ', error.message);
    res.status(500).send(error);
  }
};

exports.getTicketById = async (req, res) => {
  // Assuming you're passing the ticket ID as a path parameter
  const ticketId = req.params.id;
  console.log(`Request has been made to get ticket with id ${ticketId}`);

  try {
    const response = await axios.get(`https://api.hubapi.com/crm/v3/objects/tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
    });

    console.log('response.data: ', response.data);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const testGetTicketById = async () => {
  const ticketId = '1796980561';
  const response = await axios.get(`https://api.hubapi.com/crm/v3/objects/tickets/${ticketId}`, {
    headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
  });

  console.log(response.data);
};

// testGetTicketById();

exports.createTicket = async (req, res) => {
  const properties = req.body;
  const ticketData = { properties };

  try {
    const response = await axios.post('https://api.hubapi.com/crm/v3/objects/tickets', ticketData, {
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTicket = async (req, res) => {
  const properties = req.body;
  const ticketData = { properties };

  try {
    const response = await axios.patch(
      `https://api.hubapi.com/crm/v3/objects/tickets/${req.params.id}`,
      ticketData,
      {
        headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
      }
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
};
