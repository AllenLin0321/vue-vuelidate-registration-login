<template>
  <v-container class="my-5">
    <v-layout class="ma-5" row wrap>
      <!-- icon -->
      <v-flex md3>
        <v-img :src="require('@/assets/logo.png')" width="50%"></v-img>
      </v-flex>

      <!-- Register Form -->
      <v-flex md9>
        <h1>Get started with a free Vue account</h1>
        <v-form>
          <!-- UserName -->
          <v-text-field
            v-model="register.username"
            label="Username"
            prepend-icon="account_circle"
            :success="!$v.register.username.$invalid"
            :error=" submitted && $v.register.username.$invalid"
          ></v-text-field>

          <!-- Email -->
          <v-text-field
            v-model="register.email"
            label="Email"
            prepend-icon="email"
            :success="!$v.register.email.$invalid"
            :error=" submitted && $v.register.email.$invalid"
          ></v-text-field>

          <!-- Age -->
          <v-text-field
            v-model="register.age"
            label="Age"
            prepend-icon="timer"
            :hint="hint.age"
            :success="!$v.register.age.$invalid"
            :error=" submitted && $v.register.age.$invalid"
          ></v-text-field>

          <!-- Password -->
          <v-text-field
            v-model="register.password"
            :append-icon="showPassword? 'visibility' : 'visibility_off'"
            :type="showPassword? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="Password"
            prepend-icon="lock"
            :hint="hint.password"
            :success="!$v.register.password.$invalid"
            :error=" submitted && $v.register.password.$invalid"
          ></v-text-field>

          <!-- Confirm Password -->
          <v-text-field
            v-model="register.confirmPassword"
            type="password"
            label="Confirm Password"
            prepend-icon="check_circle"
            :success="!$v.register.confirmPassword.$invalid"
            :error=" submitted && $v.register.confirmPassword.$invalid"
          ></v-text-field>

          <!-- Agree T&S -->
          <v-checkbox v-model="register.checkAgree" color="primary">
            <template v-slot:label>
              <div>
                By clicking this button, you agree the
                <span>
                  <a href="#" @click.stop="terms.show = true">{{ terms.title }}.</a>
                </span>
              </div>
            </template>
          </v-checkbox>

          <!-- Action Button -->
          <v-btn color="info" :loading="loading" @click.prevent="registerAccount">Register</v-btn>
          <v-btn color="info" flat to="login">Cancel</v-btn>

          <v-snackbar
            v-model="snackbar.show"
            left
            bottom
            :timeout="snackbar.timeout"
            :color="snackbar.color"
          >
            {{ snackbar.text }}
            <v-btn flat @click="snackbar.show = false">Close</v-btn>
          </v-snackbar>
        </v-form>
      </v-flex>
    </v-layout>
    <!-- Dialog -->
    <v-dialog v-model="terms.show" width="70%">
      <v-card>
        <v-card-title class="title">{{ terms.title }}</v-card-title>
        <v-card-text v-for="n in 3" :key="n">{{ terms.content }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="purple" @click="terms.show = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {
  required,
  email,
  integer,
  minValue,
  minLength,
  sameAs
} from "vuelidate/lib/validators";
import axios from "axios";
import router from "@/router";
export default {
  data() {
    return {
      loading: false,
      showPassword: false,
      register: {
        username: null,
        email: null,
        age: null,
        password: null,
        confirmPassword: null,
        checkAgree: false
      },
      terms: {
        title: "Anti-spam Policy & Terms of Use",
        show: false,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.`
      },
      hint: {
        age: "must be at least 18 years old",
        password: "must have a min length of 6"
      },
      submitted: false,
      snackbar: {
        show: false,
        color: null,
        timeout: 3000,
        text: null
      }
    };
  },
  validations: {
    register: {
      username: { required },
      email: { required, email },
      age: { required, integer, minValue: minValue(18) },
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs("password") }
    }
  },
  methods: {
    registerAccount() {
      const vm = this;

      // Check agree condition
      if (!this.register.checkAgree) {
        vm.showSnackBar("Please Agree the Terms & Services", "error");
        return;
      }

      if (!this.$v.$invalid) {
        vm.submitted = true;
        vm.loading = true;

        const userData = {
          username: vm.register.username,
          email: vm.register.email,
          age: vm.register.age,
          password: vm.register.password
        };

        this.$store.dispatch("signUp", userData).then(() => {
          vm.showSnackBar("SUCCESS!!", "success");
          vm.cleanTextField();
        });
      }
    },
    showSnackBar(content, color) {
      const vm = this;
      vm.snackbar.text = content;
      vm.snackbar.color = color;
      vm.snackbar.show = true;
    },
    cleanTextField() {
      const vm = this;
      vm.loading = false;
      vm.submitted = false;

      // Clean Text Field
      vm.username = null;
      vm.email = null;
      vm.age = null;
      vm.password = null;
      vm.confirmPassword = null;
      vm.checkAgree = false;
    }
  }
};
</script>
