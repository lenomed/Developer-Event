import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * TypeScript interface for Event document
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Event schema with validation and auto-generated fields
 */
const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      sparse: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
      minlength: [5, 'Overview must be at least 5 characters'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: 'Mode must be online, offline, or hybrid',
      },
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: 'Tags must contain at least one item',
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook: Generate slug from title and normalize date/time formats
 * - Slug: auto-generated only if title is modified or slug doesn't exist
 * - Date: validated and converted to ISO format (YYYY-MM-DD)
 * - Time: normalized to HH:MM format
 * - Validates all required fields are non-empty
 */
eventSchema.pre<IEvent>('save', async function () {
  // Generate slug from title if title changed or slug is missing
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Validate and normalize date to ISO format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (this.date && !dateRegex.test(this.date)) {
    const parsed = new Date(this.date);
    if (isNaN(parsed.getTime())) {
      throw new Error('Invalid date format. Use YYYY-MM-DD.');
    }
    this.date = parsed.toISOString().split('T')[0];
  }

  // Validate and normalize time to HH:MM format
  const timeRegex = /^\d{2}:\d{2}$/;
  if (this.time && !timeRegex.test(this.time)) {
    const timeParts = this.time.split(':');
    if (timeParts.length < 2) {
      throw new Error('Invalid time format. Use HH:MM.');
    }
    const hours = String(parseInt(timeParts[0])).padStart(2, '0');
    const minutes = String(parseInt(timeParts[1])).padStart(2, '0');
    if (parseInt(hours) > 23 || parseInt(minutes) > 59) {
      throw new Error('Invalid time values. Hours must be 0-23, minutes 0-59.');
    }
    this.time = `${hours}:${minutes}`;
  }

  // Validate all required fields are non-empty strings
  const requiredFields = [
    'title',
    'description',
    'overview',
    'image',
    'venue',
    'location',
    'date',
    'time',
    'mode',
    'audience',
    'organizer',
  ];
  for (const field of requiredFields) {
    const value = (this as any)[field];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      throw new Error(`${field} cannot be empty`);
    }
  }
});

/**
 * Create unique index on slug for efficient lookups
 */
eventSchema.index({ slug: 1 }, { unique: true });

/**
 * Event model exported with TypeScript typing
 */
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;