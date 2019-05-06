export const priceSorter = {
  methods: {
    sortByPrice(flights) {
      return flights.sort((a, b) => a.ticketPrice - b.ticketPrice);
    }
  }
};
