import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../url';

function Ticketing() {
  const [tickets, setTickets] = useState([]);
  const [ticketToEdit, setTicketToEdit] = useState({ id: null, title: '', content: '' });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const response = await axios.get(`${baseURL}/api/tickets`);
    setTickets(response.data.results);
  };

  const editTicket = (ticket) => {
    setTicketToEdit(ticket);
  };

  const resetTicketToEdit = () => {
    setTicketToEdit({ id: null, title: '', content: '' });
  };

  const handleInputChange = (event) => {
    setTicketToEdit({ ...ticketToEdit, [event.target.name]: event.target.value });
  };

  const submitTicket = async () => {
    if (ticketToEdit.id) {
      await axios.put(`${baseURL}/api/tickets/${ticketToEdit.id}`, ticketToEdit);
    } else {
      await axios.post(`${baseURL}/api/tickets`, ticketToEdit);
    }
    resetTicketToEdit();
    fetchTickets();
  };
  console.log('Tickets: ', tickets);
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-white shadow rounded p-4">
          <h1 className="text-2xl mb-4">Tickets</h1>
          {/* {tickets.length > 0 &&
            tickets.map((ticket) => {
              console.log('ticket: ', ticket.properties.subject);
              return (
                <div key={ticket.id} className="mb-2">
                  <button className="text-blue-500" onClick={() => editTicket(ticket)}>
                    {ticket.properties.subject}
                  </button>
                </div>
              );
            })} */}
          <button className="bg-blue-500 text-white rounded p-2 mt-4" onClick={resetTicketToEdit}>
            Create a new ticket
          </button>
        </div>
        <div className="col-span-2 bg-white shadow rounded p-4">
          <h1 className="text-2xl mb-4">{ticketToEdit.id ? 'Edit Ticket' : 'Create Ticket'}</h1>
          <input
            className="border p-2 rounded mb-4 w-full"
            name="title"
            value={ticketToEdit.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <textarea
            className="border p-2 rounded mb-4 w-full"
            name="content"
            value={ticketToEdit.content}
            onChange={handleInputChange}
            placeholder="Content"
          />
          <button className="bg-blue-500 text-white rounded p-2" onClick={submitTicket}>
            {ticketToEdit.id ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ticketing;
