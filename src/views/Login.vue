<template>
  <v-container class="my-5">
    <v-layout class="ma-5" justify-center>
      <v-flex md6>
        <h1>Login</h1>
        <v-form>
          <v-text-field
            v-model="loginInfo.email"
            label="Email"
            prepend-icon="email"
            :error="submitted && $v.loginInfo.email.$invalid"
          ></v-text-field>
          <v-text-field
            v-model="loginInfo.password"
            :append-icon="showPassword? 'visibility' : 'visibility_off'"
            :type="showPassword? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="Password"
            prepend-icon="lock"
            :error="submitted && $v.loginInfo.password.$invalid"
            @keyup.enter="login"
          ></v-text-field>
          <v-btn color="info" :loading="loading" @click.prevent="login">Login</v-btn>
          <v-btn color="info" flat to="register">Register</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      showPassword: false,
      loading: false,
      submitted: false,
      loginInfo: {
        email: null,
        password: null
      }
    };
  },
  validations: {
    loginInfo: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    login() {
      const formData = {
        email: this.loginInfo.email,
        password: this.loginInfo.password
      };
      this.$store.dispatch("login", formData);
      this.submitted = true;
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
