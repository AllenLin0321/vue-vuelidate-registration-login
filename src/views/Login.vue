<template>
  <v-container class="my-5">
    <v-layout class="ma-5" justify-center>
      <v-flex md6>
        <h1>Login</h1>
        <v-form>
          <v-text-field v-model="loginInfo.username" label="Username" prepend-icon="account_circle"></v-text-field>
          <v-text-field
            v-model="loginInfo.password"
            :append-icon="showPassword? 'visibility' : 'visibility_off'"
            :type="showPassword? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="Password"
            prepend-icon="lock"
          ></v-text-field>
          <v-btn color="info" :loading="loading">Login</v-btn>
          <v-btn color="info" flat to="register">Register</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      loginInfo: {
        username: null,
        password: null
      },
      loading: false
    };
  }
};
</script>


<style lang="scss" scoped>
</style>
