<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar class="text-left text-bold" color="primary">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>
        <q-toolbar-title class="brand text-bold">Flight App</q-toolbar-title>
        <q-btn flat size="md" icon="account_circle" label="Sign In" :to="{ name: 'home' }"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list no-border link inset-delimiter>
        <q-item :to="{ name: 'home' }" exact>
          <q-item-side icon="flight"/>
          <q-item-main label="Flights" sublabel="Search for flights"/>
        </q-item>
        <q-item :to="{ name: 'profile' }" exact>
          <q-item-side icon="person"/>
          <q-item-main label="Profile" sublabel="User profile"/>
        </q-item>
        <q-item :to="{ name: 'bookings' }" exact>
          <q-item-side icon="card_travel"/>
          <q-item-main label="My Trips" sublabel="My bookings"/>
        </q-item>
        <q-item :to="{ name: 'bookings' }" exact>
          <q-item-side icon="check_circle"/>
          <q-item-main label="Check In" sublabel="Check In"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <transition enter-active-class="animated fadeIn" appear>
        <router-view/>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      leftDrawer: true,
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  }
};
</script>

<style></style>