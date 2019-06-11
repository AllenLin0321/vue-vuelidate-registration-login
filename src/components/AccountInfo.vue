<template>
  <div>
    <h1 class="mb-3">Account Info</h1>

    <v-form>
      <!-- UserName -->

      <v-text-field
        v-model="account.username"
        label="Username"
        :readonly="isReadOnly"
        prepend-inner-icon="account_circle"
        outline
        :success="!isReadOnly"
      ></v-text-field>

      <!-- Email -->
      <v-text-field
        v-model="account.email"
        label="Email"
        prepend-inner-icon="email"
        :readonly="isReadOnly"
        outline
        :success="!isReadOnly"
      ></v-text-field>

      <!-- Age -->
      <v-text-field
        v-model="account.age"
        label="Age"
        :readonly="isReadOnly"
        prepend-inner-icon="timer"
        outline
        :success="!isReadOnly"
      ></v-text-field>

      <!-- Action Button -->
      <v-btn color="info" @click="isReadOnly = false" v-if="isReadOnly">
        <v-icon left dark>edit</v-icon>Edit Info
      </v-btn>
      <v-btn color="success" @click="isReadOnly = true" v-else>
        <v-icon left dark>save</v-icon>Save Info
      </v-btn>

      <v-btn color="error">
        <v-icon left dark>delete_forever</v-icon>Delete
      </v-btn>
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
      },
      isReadOnly: true
    };
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      // Get the Account Info and save into state(local) and LocalStorage
      this.$store.dispatch("fetchUser").then(() => {
        // Get User Info
        const userData = this.$store.getters.userInfo;
        this.account.username = userData.username;
        this.account.email = userData.email;
        this.account.age = userData.age;
      });
    }
  }
};
</script>
