<template>
  <div>
    <h1 class="list-title">{{ title }}</h1>
    {{ button }}
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  props: ["title", "button"],
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