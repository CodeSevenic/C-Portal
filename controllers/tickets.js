const axios = require('axios');

exports.getTicketsByContactEmail = async (req, res) => {
  const email = req.query.email;
  const contactEmail = email;

  if (!contactEmail) {
    console.log('No contact email provided');
    return res.status(400).send({ message: 'No contact email provided' });
  }

  console.log(`Request has been made to get tickets associated with contact ${contactEmail}`);

  try {
    // Search for the contact by email
    const contactsResponse = await axios.post(
      'https://api.hubapi.com/crm/v3/objects/contacts/search',
      {
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: contactEmail,
              },
            ],
          },
        ],
        properties: ['email'],
      },
      {
        headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
      }
    );

    const contacts = contactsResponse.data.results;

    console.log('Contacts: ', contacts);
    const contact = contacts.find((c) => c.properties.email === contactEmail);

    if (!contact) {
      // console.log('Contact not found');
      return res.status(404).send({ message: 'Contact not found' });
    }

    const contactId = contact.id;

    // console.log('Contact ID: ', contactId);

    // Now, get all tickets associated with the contact
    const associationsResponse = await axios.get(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/associations/ticket`,
      {
        headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
        params: {
          limit: 100, // adjust this value according to your needs
        },
      }
    );

    const associatedTicketIds = associationsResponse.data.results;
    // console.log('Ticket IDs associated with', contactEmail, ':', associatedTicketIds);

    // Fetch detailed ticket data for each associated ticket
    const associatedTickets = [];

    for (const ticketIdObj of associatedTicketIds) {
      const ticketResponse = await axios.get(
        `https://api.hubapi.com/crm/v3/objects/tickets/${ticketIdObj.id}`,
        {
          headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
        }
      );

      associatedTickets.push(ticketResponse.data);
    }

    // console.log('Detailed ticket data: ', associatedTickets);
    res.send({ results: associatedTickets });
  } catch (error) {
    console.log(error);
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
