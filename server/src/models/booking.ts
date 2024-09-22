import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IBooking extends Document {
  user: ObjectId;
  restaurant: ObjectId;
  voucher: ObjectId;
  timeRange: string;
}

const bookingSchema = new Schema<IBooking>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  voucher: { type: Schema.Types.ObjectId, ref: 'Voucher', required: true },
  timeRange: { type: String, required: true },
});

const Booking = model<IBooking>('Booking', bookingSchema);
export default Booking;
