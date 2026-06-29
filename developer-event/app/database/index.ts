/**
 * Centralized export for database models
 * Enables single-file imports: import { Event, Booking } from '@/database'
 */

export { default as Event, type IEvent } from './event.model';
export { default as Booking, type IBooking } from './booking.model';