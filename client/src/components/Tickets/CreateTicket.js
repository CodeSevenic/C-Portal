import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function CreateTicket() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  const createTicket = async () => {
    const ticketData = {
      title,
      content,
    };

    await axios.post('http://localhost:3001/api/tickets', ticketData);
    history.push('/');
  };

  return (
    <div>
      <h1>Create a new ticket</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={createTicket}>Create</button>
    </div>
  );
}

export default CreateTicket;
