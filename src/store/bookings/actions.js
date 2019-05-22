import Booking from "../../shared/models/BookingClass";
import Flight from "../../shared/models/FlightClass";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

// @ts-ignore
import { Loading } from "quasar";
import axios from "axios";

export function fetchBooking({ commit }) {
  return new Promise(async (resolve, reject) => {
    Loading.show({
      message: "Loading bookings..."
    });

    try {

      const {
        // @ts-ignore
        data: {
          listBookings: { items: bookingData }
        }
      } = await API.graphql(graphqlOperation(queries.listBookings));
      const bookings = bookingData.map(booking => new Booking(booking));
      bookings.map(booking => {
        if (booking.inboundFlight) {
          booking.inboundFlight = new Flight(booking.inboundFlight);
        };
        booking.outboundFlight = new Flight(booking.outboundFlight);
        return booking;
      });

      commit("SET_BOOKINGS", bookings);
      resolve();
      Loading.hide();
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

/**
 *
 * Booking [Vuex Module Action](https://vuex.vuejs.org/guide/actions.html) - createBooking attempts payment charge via Payment service, and it effectively books a flight if payment is accepted.
 *
 * **NOTE**: It doesn't mutate the store
 * @param {object} context - Vuex action context (context.commit, context.getters, context.state, context.dispatch)
 * @param {object} obj - Object containing params required to create a booking
 * @param {object} obj.paymentToken - Stripe JS Payment token object
 * @param {Flight} obj.outboundFlight - Outbound Flight
 * @param {Flight} obj.inboundFlight - Inbound Flight
 * @returns {promise} - Promise representing booking effectively made in the Booking service.
 */
export function createBooking(
  { commit },
  { paymentToken, outboundFlight, inboundFlight = null }
) {
  const processPayment = () => {
    Loading.show({
      message: "Processing payment..."
    });

    return new Promise((resolve, reject) => {
      if (!paymentToken) reject("Invalid payment token");

      setTimeout(() => {
        let response = {
          data: {
            createPayment: {
              token: paymentToken,
              status: "CONFIRMED"
            }
          }
        };
        resolve(response);
      }, 1000);
    });
  };

  const processBooking = () => {
    Loading.show({
      message: "Booking confirmed! Redirecting to Bookings"
    });

    return new Promise(resolve => {
      setTimeout(() => {
        let response = {
          data: {
            createBooking: {
              id: makeId(),
              departureCity: outboundFlight.departureCity,
              transactionDate: new Date().toISOString(),
              outboundFlight: outboundFlight,
              inboundFlight: inboundFlight
            }
          }
        };
        resolve(response);
      }, 1000);
    });
  };

  return new Promise(async (resolve, reject) => {
    try {
      await processPayment();

      let {
        data: { createBooking: bookingData }
      } = await processBooking();

      await API.graphql(graphqlOperation(mutations.createFlight, { input: bookingData.outboundFlight }));

      let bookingInboundFlightId = null;
      if (bookingData.inboundFlight) {
        await API.graphql(graphqlOperation(mutations.createFlight, { input: bookingData.inboundFlight }));
        bookingInboundFlightId = bookingData.inboundFlight.id;
      }
      const input = {
        id: bookingData.id,
        departureCity: bookingData.departureCity,
        transactionDate: bookingData.transactionDate,
        bookingInboundFlightId: bookingInboundFlightId,
        bookingOutboundFlightId: bookingData.outboundFlight.id
      }
      const booking = await API.graphql(graphqlOperation(mutations.createBooking, { input: input }));

      resolve(booking);
    } catch (err) {
      reject(err);
    }
  });
}

function makeId() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}