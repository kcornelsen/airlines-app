<template>
  <div class="row trip">
    <q-card class="trip__card" :id="outboundFlight.flightNumber">
      <div class="col-10">
        <q-list>
          <q-list-header outbound>
            <div class="row uppercase text-bold">
              <div class="col">Departure</div>
              <div class="col text-right">{{ outboundFlight.departureDayMonthYear }}</div>
            </div>
            <div class="row text-primary flight__direction">
              <div class="col flight__left-details">
                <div
                  class="q-headline flight__departure uppercase"
                >{{ outboundFlight.departureAirportCode }}</div>
                <div
                  class="q-caption capitalize text-secondary text-bold"
                >{{ outboundFlight.departureAirportName }}</div>
              </div>
              <div class="col-2 flight__center-details text-center">
                <q-icon class="flight__icon" name="local_airport"/>
              </div>
              <div class="col flight__right-details text-right">
                <div
                  class="q-headline flight__arival uppercase"
                >{{ outboundFlight.arrivalAirportCode }}</div>
                <div
                  class="q-caption capitalize text-secondary text-bold"
                >{{ outboundFlight.arrivalAirportName }}</div>
              </div>
            </div>
            <div
              class="row text-primary flight__timing"
              v-if="
                  outboundFlight.departureTime &&
                  outboundFlight.flightDuration &&
                  outboundFlight.arrivalTime
              "
            >
              <q-card-separator class="flight__separator"/>
              <div class="col flight__left-details">
                <div class="row inline">
                  <q-icon class="flight__icon-caption" name="flight_takeoff"/>
                  <div class="q-ml-sm q-body-1 text-bold q-pt-xs">{{ outboundFlight.departureTime }}</div>
                </div>
              </div>
              <div class="col flight__center-details text-center">
                <div class="row inline">
                  <q-icon class="flight__icon-caption" name="access_time"/>
                  <div
                    class="q-ml-sm q-caption text-bold q-pt-xs"
                  >{{ outboundFlight.flightDuration }}</div>
                </div>
              </div>
              <div class="col flight__right-details text-right">
                <div class="row inline">
                  <q-icon class="flight__icon-caption" name="flight_land"/>
                  <div class="q-ml-sm q-caption text-bold q-pt-xs">{{ outboundFlight.arrivalTime }}</div>
                </div>
              </div>
            </div>
            <div class="row flight__ticket" v-if="outboundFlight.flightNumber">
              <q-card-separator class="flight__separator"/>
              <div class="col flight__center-details"></div>
              <div class="col flight__right-details text-right" v-if="outboundFlight.flightNumber">
                <div class="row inline">
                  <div class="q-caption text-primary capitalize text-bold">Flight no</div>
                  <div class="q-ml-xs q-caption text-bold">#{{ outboundFlight.flightNumber }}</div>
                </div>
              </div>
            </div>
          </q-list-header>
          <q-list-header inbound v-if="inboundFlight">
            <div class="row uppercase text-bold" v-if="inboundFlight">
              <div class="col">Return Flight</div>
              <div class="col text-right">{{ inboundFlight.departureDayMonthYear }}</div>
            </div>
            <div class="row text-primary flight__direction" v-if="inboundFlight">
              <div class="col flight__left-details">
                <div
                  class="q-headline flight__departure uppercase"
                >{{ inboundFlight.departureAirportCode }}</div>
                <div
                  class="q-caption capitalize text-secondary text-bold"
                >{{ inboundFlight.departureAirportName }}</div>
              </div>
              <div class="col-2 flight__center-details text-center">
                <q-icon class="flight__icon" name="local_airport"/>
              </div>
              <div class="col flight__right-details text-right">
                <div
                  class="q-headline flight__arival uppercase"
                >{{ inboundFlight.arrivalAirportCode }}</div>
                <div
                  class="q-caption capitalize text-secondary text-bold"
                >{{ inboundFlight.arrivalAirportName }}</div>
              </div>
            </div>
            <div
              class="row text-primary flight__timing"
              v-if="
                  inboundFlight.departureTime &&
                  inboundFlight.flightDuration &&
                  inboundFlight.arrivalTime
              "
            >
              <q-card-separator class="flight__separator"/>
              <div class="col flight__left-details">
                <div class="row inline">
                  <q-icon class="flight__icon-caption" name="flight_takeoff"/>
                  <div class="q-ml-sm q-body-1 text-bold q-pt-xs">{{ inboundFlight.departureTime }}</div>
                </div>
              </div>
              <div class="col flight__center-details text-center">
                <div class="row inline">
                  <q-icon class="flight__icon-caption" name="access_time"/>
                  <div
                    class="q-ml-sm q-caption text-bold q-pt-xs"
                  >{{ inboundFlight.flightDuration }}</div>
                </div>
              </div>
              <div class="col flight__right-details text-right">
                <div class="row inline">
                  <q-icon class="flight__icon-caption" name="flight_land"/>
                  <div class="q-ml-sm q-caption text-bold q-pt-xs">{{ inboundFlight.arrivalTime }}</div>
                </div>
              </div>
            </div>
            <div class="row flight__ticket" v-if="inboundFlight.flightNumber">
              <q-card-separator class="flight__separator"/>
              <div class="col flight__center-details"></div>
              <div class="col flight__right-details text-right" v-if="inboundFlight.flightNumber">
                <div class="row inline">
                  <div class="q-caption text-primary capitalize text-bold">Flight no</div>
                  <div class="q-ml-xs q-caption text-bold">#{{ inboundFlight.flightNumber }}</div>
                </div>
              </div>
            </div>
          </q-list-header>
          <q-list-header total>
            <q-card-separator class="total__separator bold"/>
            <div class="row totals">
              
              <div class="col flight__left-details text-secondary">
                <div class="row inline">
                  <q-icon class="flight__icon-caption" name="group"/>
                  <div class="q-ml-sm text-bold q-pt-xs">{{ numberOfTravelers }}</div>
                </div>
              </div>

              <div class="col uppercase text-bold text-right">
                <div class="uppercase text-bold">Total</div>
                <div class="q-headline text-primary text-bold">${{ tripTotal }} USD</div>
              </div>
              
            </div>
          </q-list-header>
        </q-list>
      </div>
    </q-card>
  </div>
</template>

<script>
// @ts-ignore
import FlightCard from "./FlightCard";
import Flight from "../shared/models/FlightClass";

export default {
  name: "BookingFlight",
  components: {
    FlightCard
  },

  props: {
    /**
     * @param {Flight} outboundFlight - Sets Booking Flight details from flight object
     * @param {Flight} inboundFlight - Sets Booking Flight details from flight object
     */
    outboundFlight: { type: Flight, required: true },
    inboundFlight: { type: Flight, required: false },
    numberOfTravelers: { type: Number, required: false },
    tripTotal: { type: Number, required: false }
  }
};
</script>

<style lang="stylus" scoped>
@import '~variables';

.flight {
  margin: 1.3rem 1rem;
}

.trip__card {
  min-width: 18rem;
  max-width: 32rem;
  margin: auto;
  width: 100%;
  border-radius: 0.93rem;
}

.flight__icon {
  font-size: $item-icon-size;
}

.flight__arrival {
  margin-left: 2.3rem;
}

.flight__separator {
  background-color: $secondary;
  margin: 0.4rem;
  width: 100%;
}

.total__separator {
  background-color: $primary;
  margin: 0.4rem;
  width: 100%;
}

.flight__icon-caption {
  font-size: 1.5rem;
}

.flight__price {
  font-size: 1.3rem;
}

.q-list {
  border: none;
}
</style>
