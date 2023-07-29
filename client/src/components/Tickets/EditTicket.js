import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function EditTicket() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchTicket = async () => {
      const response = await axios.get(`http://localhost:3001/api/tickets/${id}`);
      setTitle(response.data.properties.title);
      setContent(response.data.properties.content);
    };

    fetchTicket();
  }, [id]);

  const updateTicket = async () => {
    const ticketData = {
      title,
      content,
    };

    await axios.put(`http://localhost:3001/api/tickets/${id}`, ticketData);
    history.push('/');
  };

  return (
    <div>
      <h1>Edit ticket</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={updateTicket}>Update</button>
    </div>
  );
}

export default EditTicket;
