<template>
  <q-page class="container">
    <div class="wrapper">
      <div class="heading">
        <div class="q-display-1">Sign In</div>
      </div>
    </div>
    <div class="login__options q-pa-sm">
      <q-field
        class="home-icons login__options--input username"
        icon="keyboard"
        icon-color="primary"
        :label-width="8"
      >
        <q-input
          class="username"
          value="demo"
          stack-label="Username"
          placeholder="Enter your username"
          autofocus
          v-on:keyup.enter="signIn"
        ></q-input>
      </q-field>
      <q-field
        class="home-icons login__options--input password"
        icon="keyboard"
        icon-color="primary"
        :label-width="8"
      >
        <q-input
          class="password"
          stack-label="Password"
          type="password"
          placeholder="Enter your password"
          v-on:keyup.enter="signIn"
          value="testing123"
        ></q-input>
      </q-field>
    </div>
    <div class="wrapper">
      <q-btn @click="signIn" class="cta__button" color="secondary" label="Sign In"></q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Login",

  methods: {
    /**
     * Redirects to Search Page when signed in
     */
    signIn() {
      this.$router.push({ name: "search" });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~variables';
</style>;
