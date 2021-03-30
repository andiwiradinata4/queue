<template>
  <v-app>
    <h1 class="title">{{ title }}</h1>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard",
  props: ["title"],
  components: {},
};
</script>

<style scoped>
.title {
  margin-top: 10px;
  margin-left: 10px;
  color: #304457;
  
}
</style>