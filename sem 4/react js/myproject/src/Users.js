// src/components/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ userName: '', role: 'waiter' });

  useEffect(() => {
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users', form)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="userName" placeholder="User Name" value={form.userName} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="waiter">Waiter</option>
          <option value="manager">Manager</option>
          <option value="chef">Chef</option>
        </select>
        <button type="submit">Add User</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.userName} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
