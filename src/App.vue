<template>
  <v-app>
    <v-content class="all">
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="scss" scoped>
.all {
  background-color: #e9ecef;
}

</style>

