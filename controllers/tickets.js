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
    console.log('response.data: ', response.data);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
};

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
