<template>
  <div>
    <h1>Change Password</h1>

    <v-container fluid>
      <!-- Current Password -->
      <v-text-field
        v-model="current_password.content"
        :append-icon="current_password.show? 'visibility' : 'visibility_off'"
        :type="current_password.show? 'text' : 'password'"
        @click:append="current_password.show = !current_password.show"
        label="Current Password"
        prepend-icon="lock"
      ></v-text-field>

      <!-- New Password -->
      <v-text-field
        v-model="new_password.content"
        :append-icon="new_password.show? 'visibility' : 'visibility_off'"
        :type="new_password.show? 'text' : 'password'"
        @click:append="new_password.show = !new_password.show"
        label="New Password"
        loading
        prepend-icon="lock"
      >
        <template v-slot:progress>
          <v-progress-linear :value="progress" :color="color" height="7"></v-progress-linear>
        </template>
      </v-text-field>

      <!-- Action Button -->
      <v-btn color="success" @click="changePW">
        <v-icon left dark>save</v-icon>Save
      </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    current_password: {
      content: "",
      show: false
    },
    new_password: {
      content: "",
      show: false
    }
  }),
  computed: {
    progress() {
      return Math.min(100, this.new_password.content.length * 17);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    }
  },
  methods: {
    changePW() {
      const userData = this.$store.getters.userInfo;

      if (userData.password !== this.current_password.content) {
        alert("密碼錯誤");
        return;
      }

      if (this.new_password.content.length < 6) {
        alert("新密碼長度不足6位數");
        return;
      }

    }
  }
};
</script>
