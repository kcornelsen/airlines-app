/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

<template>
  <div class="row">
    <amplify-sign-up class="authenticator__form" v-bind:signUpConfig="signUpConfig"></amplify-sign-up>
  </div>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";

export default {
  data () {
    return {
      signUpConfig: {
        header: 'Create a Account!',
        defaultCountryCode: '1',
        hideDefaults: true,
        signUpFields: [
          {
            label: 'Username',
            key: 'username',
            required: true,
            displayOrder: 1,
            type: 'string'
          },
          {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 2,
            type: 'password'
          },
          {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 3,
            type: 'email'
          },
           {
            label: 'First Name',
            key: 'given_name',
            required: true,
            displayOrder: 4,
            type: 'string'
          },
          {
            label: 'Last Name',
            key: 'family_name',
            required: true,
            displayOrder: 5,
            type: 'string'
          }
        ]
      }
    }
  },
    mounted() {
    AmplifyEventBus.$on("authState", info => {
      if (info === "signedIn") {
        // return to where we came from
        this.$router.push({ name: "profile" });
      }
    });

AmplifyEventBus.$on('authState', button => {
        if(button == 'signIn'){
            console.log(`Sign Up was clicked`)
            this.$router.push({ name: 'login'})
        } else {
            console.log(`${button} was clicked`)
            this.$router.push({ name: 'home'})
        }
    })
    this.logger = new this.$AmplifyEventBus.Logger(this.$options.name);
  },
}
</script>

<style lang="stylus">
@import '~variables';

:root {
  // Not a safe way to override as this can change at build
  // https://github.com/aws-amplify/amplify-js/issues/2471
  --amazonOrange: $secondary !important;
  --color-primary: $primary !important;
}

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
</style>