// @ts-nocheck
export const scheduleFilter = {
  methods: {
    filterBySchedule(flights, { departure, arrival }) {
      if (!departure && !arrival) return flights;

      if (departure) {
        flights = flights.filter(function (flight) {
          let flightDatetime = new Date(flight.departureDate);
          let desiredDeparture = new Date(
            flightDatetime.getFullYear(),
            flightDatetime.getMonth(),
            flightDatetime.getDate(),
            departure.getHours(),
            departure.getMinutes()
          );
          let flightSchedule = flightDatetime.getTime();
          let desiredSchedule = desiredDeparture.getTime();
          return flightSchedule >= desiredSchedule;
        });
      }

      if (arrival) {
        flights = flights.filter(function (flight) {
          let flightDatetime = new Date(flight.arrivalDate);
          let desiredArrival = new Date(
            flightDatetime.getFullYear(),
            flightDatetime.getMonth(),
            flightDatetime.getDate(),
            arrival.getHours(),
            arrival.getMinutes()
          );
          let flightSchedule = flightDatetime.getTime();
          let desiredSchedule = desiredArrival.getTime();
          return flightSchedule <= desiredSchedule;
        });
      }

      return flights;
    }
  }
};
