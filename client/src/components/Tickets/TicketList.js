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
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import { formatDistanceToNow, parseISO } from 'date-fns';
import baseURL from '../../url';
import { fit } from '@syncfusion/ej2-react-popups';
import './Tickets.css';

function Ticketing() {
  const [tickets, setTickets] = useState([]);
  const [ticketToEdit, setTicketToEdit] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/tickets`);
      if (response.data.results) {
        const reshapedData = response.data.results.map((ticket) => ({
          id: `#${ticket.id}`,
          subject: ticket.properties.subject,
          created: new Date(ticket.properties.createdate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          lastActivity:
            formatDistanceToNow(parseISO(ticket.properties.hs_lastmodifieddate)) + ' ago',
          status: ticket.properties.hs_pipeline_stage,
        }));
        setTickets(reshapedData);
      } else {
        throw new Error('No results found.');
      }
    } catch (error) {
      console.log(error);
      // Depending on your application, you might want to display this error message to your users.
    }
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

  useEffect(() => {
    const filterTickets = () => {
      if (statusFilter === 'all') {
        setFilteredTickets(tickets);
      } else {
        setFilteredTickets(tickets.filter((ticket) => ticket.status === statusFilter));
      }
    };
    filterTickets();
  }, [tickets, statusFilter]);

  const toolbarOptions = [
    'Search',
    {
      template: () => (
        <div className="flex gap-5">
          <span className="text-[14px] font-semibold text-gray-500">Status: </span>{' '}
          <select
            className="border-1 w-32 border-color-gray-400 rounded-md p-1 text-gray-400 text-[12px]"
            value={statusFilter}
            onChange={(e) => {
              console.log('e.target.value: ', e.target.value);
              setStatusFilter(e.target.value);
            }}
          >
            <option className="text-gray-400 text-[12px]" value="all">
              All
            </option>
            <option className="text-gray-400 text-[12px]" value="open">
              Open
            </option>
            <option className="text-gray-400 text-[12px]" value="closed">
              Closed
            </option>
          </select>
        </div>
      ),
    },
  ];

  const handleCellClick = (data) => {
    setTicketToEdit({
      ...data,
      title: data.subject,
      content: '',
    });
  };

  const queryCellInfo = (args) => {
    if (args.column.field === 'subject') {
      args.cell.onclick = () => handleCellClick(args.data);
    }
  };

  const GridInfo = () => {
    const key = `${statusFilter}-${filteredTickets.length}`;
    // Handle row selection event
    return (
      <GridComponent
        key={key}
        dataSource={filteredTickets}
        width="auto"
        allowPaging
        style={{ overflowX: 'auto' }}
        allowSorting
        toolbar={toolbarOptions}
        pageSettings={{ pageCount: 5 }}
        queryCellInfo={queryCellInfo}
      >
        <ColumnsDirective>
          <ColumnDirective field="id" headerText="ID" />
          <ColumnDirective field="subject" headerText="Subject" />
          <ColumnDirective field="created" headerText="Created" />
          <ColumnDirective field="lastActivity" headerText="Last Activity" />
          <ColumnDirective field="status" headerText="Status" />
        </ColumnsDirective>
        <Inject services={[Page, Toolbar]} />
      </GridComponent>
    );
  };

  const deleteTicket = async () => {};

  console.log('Filtered Tickets: ', filteredTickets);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-7xl mx-auto px-5 py-20 bg-white rounded-3xl">
        {filteredTickets.length > 0 ? GridInfo() : GridInfo()}
        {/* <button
          className="bg-moBlueLight text-white rounded p-2 px-5 mt-10 "
          onClick={() => setTicketToEdit({ title: '', content: '' })}
        >
          Create a new ticket
        </button> */}
      </div>
      <ReactModal isOpen={ticketToEdit !== null} onRequestClose={() => setTicketToEdit(null)}>
        <button className="close-button" onClick={() => setTicketToEdit(null)}>
          Close
        </button>
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
            {ticketToEdit.id && (
              <button className="bg-red-500 text-white rounded p-2" onClick={deleteTicket}>
                Delete
              </button>
            )}
          </>
        )}
      </ReactModal>
    </div>
  );
}

export default Ticketing;
