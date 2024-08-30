import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vouchers');
        setVouchers(response.data);
      } catch (error) {
        console.error('Failed to fetch vouchers');
      }
    };

    fetchVouchers();
  }, []);

  return (
    <section className='container mt-5'>
      <h2 className="mb-4">Available Vouchers</h2>
      <ul className="list-group">
        {vouchers.map(voucher => (
          <li key={voucher._id} className="list-group-item">
            <h5 className="mb-1">{voucher.name}</h5>
            <small className="text-muted">Expires on {new Date(voucher.expiry).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VoucherList;
