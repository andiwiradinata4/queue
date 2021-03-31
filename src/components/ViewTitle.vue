<template>
  <div>
    <h1 class="list-title">{{ title }}</h1>
    <v-divider></v-divider>
  </div>
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