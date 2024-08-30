import React from 'react';
import VoucherList from '../components/voucherlist';
import VoucherRedemption from '../components/voucherredemption';

const Vouchers = () => {
  return (
    <div className='container'>
      <VoucherList />
      <VoucherRedemption />
    </div>
  );
};

export default Vouchers;
