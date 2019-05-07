import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "./layouts/Default.vue";
import SearchFlights from "./views/Search.vue";
import Profile from "./views/Profile.vue";
import FlightResults from "./views/FlightResults.vue";
import FlightSelection from "./views/FlightSelection.vue";
import Bookings from "./views/Bookings.vue";
import SignIn from "./views/SignIn.vue";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            component: DefaultLayout,
            children: [
                {
                    path: "/search",
                    name: "search",
                    component: SearchFlights
                },
                {
                    name: "searchResults",
                    path: "/search/results",
                    component: FlightResults,
                    props: route => ({ ...route.params, ...route.query })
                },
                {
                    name: "selectedFlight",
                    path: "/search/results/review",
                    component: FlightSelection,
                    props: route => ({ ...route.params, ...route.query }) // converts query strings and params to props
                },
                {
                    path: "/profile",
                    name: "profile",
                    component: Profile
                },
                {
                    path: "/profile/bookings",
                    name: "bookings",
                    component: Bookings
                },
                {
                    path: "",
                    name: "home",
                    component: SignIn
                }
            ]
        }
    ]
});

export default router;