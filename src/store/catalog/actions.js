import Flight from "../../shared/models/FlightClass";
import axios from "axios";
import uuid from 'uuid';
import airports from './airports.json';

/**
 *
 * Catalog [Vuex Module Action](https://vuex.vuejs.org/guide/actions.html) - fetchFlights retrieves all flights for a given date, departure and arrival from Catalog service.
 *
 * It uses SET_FLIGHTS mutation to update Catalog state with the latest flights.
 *
 * It also controls Flight Loader when fetching data from Catalog service.
 * @param {object} context - Vuex action context (context.commit, context.getters, context.state, context.dispatch)
 * @param {object} obj - Object containing params to filter flights from catalog
 * @param {Date} obj.date - Date in DD-MM-YYYY format
 * @param {string} obj.departure - Airport IATA to be filtered as departure
 * @param {string} obj.arrival - Airport IATA to be filtered as arrival
 * @returns {promise} - Promise representing whether flights from Catalog have been updated in the store
 * @see {@link SET_FLIGHTS} for more info on mutation
 * @see {@link SET_LOADER} for more info on mutation
 */

export function fetchFlights({ commit }, { date, departure, arrival }) {
  return new Promise(async (resolve, reject) => {
    commit("SET_LOADER", true);
    try {
      let flights = generateFlights(date, departure, arrival)
      commit("SET_FLIGHTS", flights);
      commit("SET_LOADER", false);
      resolve();
    } catch (error) {
      console.error(error);
      commit("SET_LOADER", false);
      reject(error);
    }
  });
}

export function fetchReturnFlights({ commit }, { date, departure, arrival }) {
  return new Promise(async (resolve, reject) => {
    commit("SET_LOADER", true);
    try {
      let flights = generateFlights(date, departure, arrival)
      commit("SET_RETURN_FLIGHTS", flights);
      commit("SET_LOADER", false);
      resolve();
    } catch (error) {
      console.error(error);
      commit("SET_LOADER", false);
      reject(error);
    }
  });
}

function generateFlights(date, departureAirport, arrivalAirport) {
  let departureDate = new Date(date)
  departureDate.setHours(6);
  let arrivalDate = new Date(date)
  arrivalDate.setHours(10);
  arrivalDate.setMinutes(15);
  const uuidv4 = require('uuid/v4');


  const arrival = airports.find(airport => airport.code === arrivalAirport);
  const departure = airports.find(airport => airport.code === departureAirport);

  let flights = []
  var numberOfFlightsReturn = Math.floor(Math.random() * 4) + 1;
  for (var i = 0; i < numberOfFlightsReturn; i++) {

    departureDate.setHours(departureDate.getHours() + 1);
    arrivalDate.setHours(arrivalDate.getHours() + 1);
    arrivalDate.setMinutes(arrivalDate.getMinutes() + 5);
    let flight = new Flight({
      arrivalAirportCode: arrivalAirport,
      arrivalAirportName: arrival.name,
      arrivalCity: arrival.city,
      arrivalDate: arrivalDate.toString(),
      arrivalLocale: "Europe/Madrid",
      departureAirportCode: departureAirport,
      departureAirportName: departure.name,
      departureCity: departure.city,
      departureDate: departureDate.toString(),
      departureLocale: "Europe/London",
      flightNumber: 1810 + i,
      id: uuidv4(),
      ticketCurrency: "USD",
      ticketPrice: Math.floor(Math.random() * (300 - 80 + 1) + 80)
    })
    flights.push(flight)
  }
  return flights;
}

/**
 *
 * Catalog [Vuex Module Action](https://vuex.vuejs.org/guide/actions.html) - fetchByFlightNumber retrieves a flight given a flight number identification from Catalog service.
 *
 * Similarly to fetchFlights, it also controls Flight Loader when fetching data from Catalog service.
 *
 * **NOTE**: It doesn't mutate the store
 * @param {object} context - Vuex action context (context.commit, context.getters, context.state, context.dispatch)
 * @param {object} obj - Object containing params to filter flights from catalog
 * @param {Date} obj.date - Date in DD-MM-YYYY format
 * @param {string} obj.departure - Airport IATA to be filtered as departure
 * @param {string} obj.arrival - Airport IATA to be filtered as arrival
 * @param {number} obj.flightNumber - Flight Number
 * @returns {promise} - Promise representing flight from Catalog service.
 * @see {@link SET_LOADER} for more info on mutation
 */
export function fetchByFlightNumber(
  { commit },
  { date, departure, arrival, flightNumber }
) {
  return new Promise(async (resolve, reject) => {
    try {
      commit("SET_LOADER", true);
      const { data: flightData } = await axios.get("/mocks/flights.json");
      const flight = new Flight(
        flightData.find(flight => flight.flightNumber === flightNumber)
      );

      commit("SET_LOADER", false);
      resolve(flight);
    } catch (error) {
      console.error(error);
      commit("SET_LOADER", false);
      reject(error);
    }
  });
}


export function fetchByReturnFlightNumber(
  { commit },
  { date, departure, arrival, flightNumber }
) {
  return new Promise(async (resolve, reject) => {
    try {
      commit("SET_LOADER", true);
      const { data: flightData } = await axios.get("/mocks/flights.json");
      const flight = new Flight(
        flightData.find(flight => flight.flightNumber === flightNumber)
      );

      commit("SET_LOADER", false);
      resolve(flight);
    } catch (error) {
      console.error(error);
      commit("SET_LOADER", false);
      reject(error);
    }
  });
}