import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IReview extends Document {
  user: ObjectId;
  restaurant: ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

const Review = model<IReview>('Review', reviewSchema);
export default Review;
