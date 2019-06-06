<template>
  <div class="row">
    <amplify-forgot-password class="authenticator__form"></amplify-forgot-password>
  </div>
</template>

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