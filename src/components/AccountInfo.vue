<template>
  <div>
    <h1 class="mb-3">Account Info</h1>

    <v-form>
      <!-- UserName -->

      <v-text-field
        v-model="account.username"
        label="Username"
        prepend-inner-icon="account_circle"
        outline
      ></v-text-field>

      <!-- Email -->
      <v-text-field v-model="account.email" label="Email" prepend-inner-icon="email" outline></v-text-field>

      <!-- Age -->
      <v-text-field v-model="account.age" label="Age" prepend-inner-icon="timer" outline></v-text-field>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: {
        username: "",
        email: "",
        age: ""
      }
    };
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      // Get the Account Info and save into state(local) and LocalStorage
      this.$store.dispatch("fetchUser").then(res => {
        // Get User Info
        this.account.username = res.username;
        this.account.email = res.email;
        this.account.age = res.age;
      });
    }
  }
};
</script>
