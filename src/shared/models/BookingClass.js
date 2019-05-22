// @ts-nocheck
import { date } from "quasar";

/** Class representing a Booking. All permutations of data from Booking, a different date format for instance, should happen here. */
export default class Booking {
  /**
   * Creates an instance of Booking.
   * @param {Object} Booking
   * @param {string} [Booking.id] - Booking ID
   * @param {string} Booking.departureCity - Booking Departure City
   * @param {string} Booking.transactionDate - Effective booking was created
   * @param {Flight} Booking.inboundFlight - Inbound flight
   * @param {Flight} Booking.outboundFlight - Outbound flight
   */
  constructor({
    id,
    departureCity,
    transactionDate,
    inboundFlight,
    outboundFlight = null
  }) {
    this.id = id;
    this.departureCity = departureCity;
    this.transactionDate = new Date(transactionDate);
    this.inboundFlight = inboundFlight;
    this.outboundFlight = outboundFlight;
  }
  /**
   * Get the effective booking date
   * @type {string}
   * @readonly
   * @return {string} Formatted booking date (e.g 16 JAN 2019)
   */
  get bookingDate() {
    return date.formatDate(this.transactionDate, "DD MMM YYYY");
  }
}