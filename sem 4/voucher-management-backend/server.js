const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/vouchers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const voucherSchema = new mongoose.Schema({
  name: String,
  discount: Number,
  expiry: Date,
});

const Voucher = mongoose.model('Voucher', voucherSchema);

// Endpoint to create a voucher
app.post('/api/vouchers', async (req, res) => {
  const { name, discount, expiry } = req.body;

  const voucher = new Voucher({
    name,
    discount,
    expiry,
  });

  try {
    await voucher.save();
    res.status(201).json(voucher);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create voucher' });
  }
});

// Endpoint to get all vouchers
app.get('/api/vouchers', async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vouchers' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
