<template>
  <div>
    <div v-if="!signedIn">
      <input v-model="username" type="text" name placeholder="UserName">
      <br>
      <input v-model="password" type="password" name placeholder="Password">
      <br>
      <button @click="signIn">Sign In</button>
    </div>
    <div v-if="signedIn">
      <button @click="signOut">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "test",
      password: "testing123"
    };
  },
  created() {
    this.findUser();
    AmplifyEventBus.$on("authState", info => {
      if (info === "signedIn") {
        this.findUser();
      } else {
        this.$store.state.signedIn = false;
        // this.signedIn = false;
        this.$store.state.user = null;
      }
    });
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    }
  },
  methods: {
    signIn() {
      Auth.signIn(username, password)
        .then(user => {
          this.$store.state.signedIn = !!user;
          this.$store.state.user = user;
        })
        .catch(err => console.log(err));
    },
    signOut() {
      Auth.signOut()
        .then(data => {
          this.$store.state.signedIn = !!data;
        })
        .catch(err => console.log(err));
    },
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.$store.state.signedIn = true;
        this.$store.state.user = user;
        console.log(user);
      } catch (err) {
        Auth.signUp({
          username: this.username,
          password: this.password
        })
          .then(data => (this.user = data.user))
          .catch(err => console.log(err));
        this.$store.state.signedIn = true;
        this.$store.state.user = user;
        console.log(user);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~variables';
</style>