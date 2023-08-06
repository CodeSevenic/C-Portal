import React, { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Toolbar,
} from '@syncfusion/ej2-react-grids';

import './Tickets.css';
import { useAuthStateContext } from '../../contexts/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Ticketing() {
  const { filteredTickets, setStatusFilter, statusFilter, fetchTickets, loadingTickets } =
    useAuthStateContext();

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

  const email = sessionStorage.getItem('email');

  const refreshTickets = async () => {
    await fetchTickets(email);
  };

  // const handleCellClick = (data) => {
  //   setTicketToEdit({
  //     ...data,
  //     title: data.subject,
  //     content: '',
  //   });
  // };

  // const queryCellInfo = (args) => {
  //   if (args.column.field === 'subject') {
  //     args.cell.onclick = () => handleCellClick(args.data);
  //   }
  // };

  const GridInfo = () => {
    const key = `${statusFilter}-${filteredTickets.length}`;
    // Handle row selection event
    return (
      <GridComponent
        key={key}
        dataSource={filteredTickets}
        width="auto"
        allowPaging
        style={{ overflowX: 'hidden' }}
        allowSorting
        toolbar={toolbarOptions}
        pageSettings={{ pageCount: 5 }}
        // queryCellInfo={queryCellInfo}
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

  console.log('Filtered Tickets: ', filteredTickets);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-7xl mx-auto px-5 py-20 bg-white rounded-3xl relative">
        <div className="mb-8 flex justify-center">
          <button className="flex max-w-fit items-center gap-4">
            <p className="font-semibold">Refresh Tickets</p>
            <FiRefreshCcw className="text-moYellow" />
          </button>
        </div>
        {loadingTickets ? <LoadingSpinner /> : null}
        {filteredTickets.length > 0 ? GridInfo() : GridInfo()}
      </div>
    </div>
  );
}

export default Ticketing;
