import mongoose, { Schema, Document } from 'mongoose';

interface IRestaurant extends Document {
  name: string;
  address: string;
  cuisine: string[];
  menu: string[];
}

const RestaurantSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: [String], required: true },
  menu: { type: [String], required: true }
});

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
