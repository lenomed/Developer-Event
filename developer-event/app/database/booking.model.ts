import mongoose, { Schema, Document, Model } from 'mongoose';
import Event from './event.model';

/**
 * TypeScript interface for Booking document
 */
export interface IBooking extends Document {
  _id: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking schema with validation and reference to Event
 */
const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email format',
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook: Verify eventId references an existing Event
 * Throws error if the event does not exist to maintain referential integrity
 */
bookingSchema.pre('save', async function () {
  // Check if eventId exists in Event collection
  const eventExists = await Event.findById(this.eventId);
  if (!eventExists) {
    throw new Error('Event does not exist');
  }
});

/**
 * Create index on eventId for efficient lookups
 */
bookingSchema.index({ eventId: 1 });

/**
 * Booking model exported with TypeScript typing
 */
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;