import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "./layouts/Default.vue";
import SearchFlights from "./views/Search.vue";
import Profile from "./views/Profile.vue";
import ReturnFlightResults from "./views/ReturnFlightResults.vue";
import FlightResults from "./views/FlightResults.vue";
import FlightSelection from "./views/FlightSelection.vue";
import Bookings from "./views/Bookings.vue";
import Auth from "./views/Authentication.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            component: DefaultLayout,
            children: [
                {
                    name: "searchResults",
                    path: "/search/results",
                    component: FlightResults,
                    props: route => ({ ...route.params, ...route.query })
                },
                {
                    name: "returnResults",
                    path: "/search/return-results",
                    component: ReturnFlightResults,
                    props: route => ({ ...route.params, ...route.query })
                },
                {
                    name: "selectedFlight",
                    path: "/search/results/review",
                    component: FlightSelection,
                    props: route => ({ ...route.params, ...route.query }), // converts query strings and params to props
                    meta: { requiresAuth: true }
                },
                {
                    path: "/profile",
                    name: "profile",
                    component: Profile,
                    meta: { requiresAuth: true }
                },
                {
                    path: "/profile/bookings",
                    name: "bookings",
                    component: Bookings,
                    meta: { requiresAuth: true }
                },
                {
                    path: "",
                    name: "home",
                    component: SearchFlights
                },
                {
                    path: "/auth",
                    name: "auth",
                    component: Auth
                }

            ]
        }
    ]
});

/**
 * Authentication Guard for routes with requiresAuth metadata
 *
 * @param {Object} to - Intended route navigation
 * @param {Object} from - Previous route navigation
 * @param {Object} next - Next route navigation
 * @returns {Object} next - Next route
 */
router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters["profile/isAuthenticated"]) {
            try {
                await store.dispatch("profile/getSession");
                next();
            } catch (err) {
                next({ name: "auth", query: { redirectTo: to.name } });
            }
        }
    }
    next();
});

export default router;