// models/voucher.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IVoucher } from '../interfaces/voucher';

const VoucherSchema: Schema = new Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  dateRange: {
    type: String,
    required: true,
  },
  timeRange: {
    type: String,
    required: true,
  },
  daysAvailable: {
    type: [String],
    required: true,
  },
  available: {
    type: Number, // Number of vouchers available
    required: true,
    default: 0, // Set a default value
  },
  // Add other fields as necessary
});

export default mongoose.model<IVoucher & Document>('Voucher', VoucherSchema);
