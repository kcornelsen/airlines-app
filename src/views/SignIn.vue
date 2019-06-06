<template>
  <div class="row center">
    <div class="authenticator__form">
      <div class="shadow-1 Form__formSection___3tqxz">
        <div class="Section__sectionHeader___13iO4">Sign In</div>
        <div class="body Section__sectionBody___3DCrX">
          <q-field class="Form__formField___2DWhT">
            <div class="Input__inputLabel___nQolz">Username *</div>
            <q-input class="Input__input___2Sh1s" autofocus v-model="username"></q-input>
          </q-field>
          <q-field class="Form__formField___2DWhT">
            <div class="Input__inputLabel___nQolz">Password *</div>
            <q-input class="Input__input___2Sh1s" autofocus v-model="password"></q-input>
            <div class="Hint__hint___3Hrww">
              Forget your password?
              <a class="Anchor__a___3JUCG" @click="forgot">Reset Password</a>
            </div>
          </q-field>
        </div>
        <div class="Section__sectionFooter___1QlDn">
          <span class="Section__sectionFooterPrimaryContent___36Gb1">
            <q-btn class="Button__button___1FrBC" @click="signIn">Sign In</q-btn>
          </span>
          <span class="Section__sectionFooterSecondaryContent___3cjOa">
            No Account?
            <a class="Anchor__a___3JUCG" @click="signUp">Create Account</a>
          </span>
        </div>
        <div class="error" v-if="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth, Logger } from "aws-amplify";
import * as AmplifyUI from "@aws-amplify/ui";
import { AmplifyEventBus } from "aws-amplify-vue";

const logger = new Logger("Auth.SignIn");
export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async signIn() {
      this.setError("");
      Auth.signIn(this.username, this.password)
        .then(user => {
          console.log("Sign-in success", user);
          AmplifyEventBus.$emit("authState", "signedIn");
          return this.$router.push({ name: "home" });
        })
        .catch(error => {
          this.setError(error);
        });
    },
    forgot() {
      this.$router.push({ name: "forgot" });
    },
    signUp() {
      this.$router.push({ name: "signUp" });
    },
    setError: function(error) {
      this.error = error.message || error;
    }
  }
};
</script>


<style lang="stylus" scoped>
@import '~variables';

.authenticator__form {
  @media only screen and (min-device-width: 700px) {
    margin: auto;
    padding: 15vmin;
  }

  > * {
    font-family: 'Raleway', 'Open Sans', sans-serif;
  }

  @media only screen and (min-device-width: 300px) and (max-device-width: 700px) {
    > div {
      min-width: 80vw;
      padding: 10vmin;
    }
  }
}

.signin--input {
  padding: 0.3rem 1.5rem;
  max-width: 60rem;
  margin: auto;
}

.Form__formSection___3tqxz {
  position: relative;
  margin-bottom: 20px;
  background-color: var(--form-color);
  padding: 35px 40px;
  text-align: left;
  display: inline-block;
  min-width: 458px;
  border-radius: 6px;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
}

.Section__sectionHeader___13iO4 {
  color: var(--deepSquidInk);
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 500;
}

.Section__sectionBody___3DCrX {
  margin-bottom: 30px;
}

.Form__formField___2DWhT {
  margin-bottom: 22px;
}

.Input__inputLabel___nQolz {
  color: var(--input-color);
  font-size: 14px;
  margin-bottom: 8px;
}

.Input__input___2Sh1s {
  display: block;
  width: 100%;
  padding: 16px;
  font-size: 14px;
  color: var(--input-color);
  background-color: var(--input-background-color);
  background-image: none;
  border: 1px solid var(--lightGrey);
  border-radius: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.Section__sectionFooter___1QlDn {
  font-size: 14px;
  color: var(--grey);
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  flex-direction: row-reverse;
  -webkit-box-align: start;
  align-items: flex-start;
}

.Section__sectionFooterPrimaryContent___36Gb1 {
  margin-left: auto;
}

.Button__button___1FrBC {
  min-width: 153px;
  display: inline-block;
  margin-bottom: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  color: var(--button-color);
  background-color: var(--button-background-color);
  border-color: #ccc;
  text-transform: uppercase;
  padding: 14px 0;
  letter-spacing: 1.1px;
  border: none;
}

.Section__sectionFooterSecondaryContent___3cjOa {
  margin-right: auto;
  align-self: center;
}

.Anchor__a___3JUCG {
  color: var(--link-color);
  cursor: pointer;
}

.Hint__hint___3Hrww {
  color: var(--grey);
  font-size: 12px;
}
</style>