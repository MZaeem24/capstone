// src/components/Inventory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ itemName: '', quantity: '', threshold: '' });

  useEffect(() => {
    axios.get('/api/inventory')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/inventory', form)
      .then(response => setItems([...items, response.data]))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="itemName" placeholder="Item Name" value={form.itemName} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input type="number" name="threshold" placeholder="Restock Threshold" value={form.threshold} onChange={handleChange} required />
        <button type="submit">Update Inventory</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.itemName} - {item.quantity} (Restock at {item.threshold})</li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
