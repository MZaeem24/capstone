// src/components/Orders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ tableNumber: '', menuItem: '', quantity: '' });

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/orders', form)
      .then(response => setOrders([...orders, response.data]))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Orders</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="tableNumber" placeholder="Table Number" value={form.tableNumber} onChange={handleChange} required />
        <input name="menuItem" placeholder="Menu Item" value={form.menuItem} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <button type="submit">Place Order</button>
      </form>
      <ul>
        {orders.map(order => (
          <li key={order.id}>Table {order.tableNumber}: {order.menuItem} x {order.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
