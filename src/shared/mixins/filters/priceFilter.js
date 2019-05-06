// @ts-nocheck
export const priceFilter = {
  methods: {
    filterByMaxPrice(flights, maxPrice) {
      if (!maxPrice) return flights;
      return flights.filter(flight => flight.ticketPrice <= maxPrice);
    }
  }
};
