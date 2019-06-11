<template>
  <v-container class="my-5">
    <v-layout class="ma-5" row wrap>

      <!-- Left Side -->
      <v-flex md4 pr-4>
        <h1>Account Settings</h1>
        <v-navigation-drawer permanent floating>
          <v-list>
            <v-list-tile
              v-for="(navigation, index) in navigations"
              :key="index"
              :to="navigation.to"
            >
              <!-- Navigation Icon -->
              <v-list-tile-action>
                <v-icon>{{ navigation.icon }}</v-icon>
              </v-list-tile-action>

              <!-- Navigation Content -->
              <v-list-tile-content>
                <v-list-tile-title>{{ navigation.content }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <!-- Logout Button -->
          <v-btn color="teal darken-2" dark @click.prevent="logout">
            <v-icon left dark>exit_to_app</v-icon>Logout
          </v-btn>
        </v-navigation-drawer>
      </v-flex>

      <!-- Right Side -->
      <v-flex md8>
        <router-view></router-view>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      navigations: [
        {
          icon: "account_circle",
          content: "Account Info",
          to: "account"
        },
        {
          icon: "lock",
          content: "Change Password",
          to: "password"
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  background-color: #e9ecef;
}
</style>

