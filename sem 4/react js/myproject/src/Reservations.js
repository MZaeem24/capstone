// src/components/Reservations.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({ name: '', date: '', time: '', partySize: '' });

  useEffect(() => {
    axios.get('/api/reservations')
      .then(response => setReservations(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/reservations', form)
      .then(response => setReservations([...reservations, response.data]))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Reservations</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="time" name="time" value={form.time} onChange={handleChange} required />
        <input type="number" name="partySize" placeholder="Party Size" value={form.partySize} onChange={handleChange} required />
        <button type="submit">Make Reservation</button>
      </form>
      <ul>
        {reservations.map(res => (
          <li key={res.id}>{res.name} - {res.date} {res.time} - Party of {res.partySize}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
