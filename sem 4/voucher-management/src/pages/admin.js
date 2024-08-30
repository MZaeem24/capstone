import React from 'react';
import VoucherCreation from '../components/vouchercreation';
import Dashboard from '../components/dashboard';
import UserManagement from '../components/usermanagement';

const Admin = () => {
  return ( 
    <div className='container'>
      <h1>Admin Panel</h1>
      <VoucherCreation />
      <Dashboard />
      <UserManagement />
    </div>
  );
};

export default Admin;
