import React, { useState } from 'react';
import axios from 'axios';

const VoucherCreation = () => {
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiry, setExpiry] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/vouchers', {
        name,
        discount,
        expiry,
      });
      alert(`Voucher "${response.data.name}" with ${response.data.discount}% discount created!`);
    } catch (error) {
      alert('Failed to create voucher');
    }
  };

  return (
    <section className="container mt-5">
      <h2 className="mb-4">Create Voucher</h2>
      <form onSubmit={handleCreate}>
        <div className="mb-3">
          <label htmlFor="voucherName" className="form-label">Voucher Name:</label>
          <input
            type="text"
            className="form-control"
            id="voucherName"
            placeholder="Enter Voucher Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="discount" className="form-label">Discount (%):</label>
          <input
            type="number"
            className="form-control"
            id="discount"
            placeholder="Enter Discount Percentage"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expiry" className="form-label">Expiry Date:</label>
          <input
            type="date"
            className="form-control"
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Voucher</button>
      </form>
    </section>
  );
};

export default VoucherCreation;
