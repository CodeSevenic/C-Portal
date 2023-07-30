import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Search,
  Filter,
} from '@syncfusion/ej2-react-grids';
import { formatDistanceToNow, parseISO } from 'date-fns';
import baseURL from '../../url';

function Ticketing() {
  const toolbarOptions = ['Search'];
  const [tickets, setTickets] = useState([]);
  const [ticketToEdit, setTicketToEdit] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const response = await axios.get(`${baseURL}/api/tickets`);
    const reshapedData = response.data.results.map((ticket) => ({
      id: ticket.id,
      subject: ticket.properties.subject,
      created: new Date(ticket.properties.createdate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      lastActivity: formatDistanceToNow(parseISO(ticket.properties.hs_lastmodifieddate)) + ' ago',
      status: ticket.properties.hs_pipeline_stage,
    }));
    setTickets(reshapedData);
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
    setTicketToEdit(null);
    fetchTickets();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <GridComponent
          dataSource={tickets}
          width="auto"
          allowPaging
          allowSorting
          allowFiltering
          pageSettings={{ pageCount: 5 }}
          toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            <ColumnDirective field="id" headerText="ID" />
            <ColumnDirective field="subject" headerText="Subject" />
            <ColumnDirective field="created" headerText="Created" />
            <ColumnDirective field="lastActivity" headerText="Last Activity" />
            <ColumnDirective field="status" headerText="Status" />
          </ColumnsDirective>
          <Inject services={[Search, Page, Filter]} />
        </GridComponent>
      </div>
      <button
        className="bg-blue-500 text-white rounded p-2 mt-4"
        onClick={() => setTicketToEdit({ title: '', content: '' })}
      >
        Create a new ticket
      </button>
      <ReactModal isOpen={ticketToEdit !== null}>
        <h1 className="text-2xl mb-4">
          {ticketToEdit && ticketToEdit.id ? 'Edit Ticket' : 'Create Ticket'}
        </h1>
        {ticketToEdit && (
          <>
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
          </>
        )}
      </ReactModal>
    </div>
  );
}

export default Ticketing;
