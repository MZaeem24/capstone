// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/reservations">Reservations</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/users">Users</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
