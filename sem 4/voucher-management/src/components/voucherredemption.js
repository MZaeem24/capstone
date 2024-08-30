import React, { useState } from 'react';

const VoucherRedemption = () => {
  const [code, setCode] = useState('');

  const handleRedeem = () => {
    console.log('Voucher Redeemed:', code);
    // Add API call to redeem voucher
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Redeem Voucher</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Voucher Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleRedeem}>
          Redeem
        </button>
      </div>
    </div>
  );
};

export default VoucherRedemption;
