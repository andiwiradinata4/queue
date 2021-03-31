<template>
  <v-app>
    <Title v-bind:title="title" />
    
  </v-app>
</template>

<script>
import Title from "@/components/ViewTitle.vue";

export default {
  name: "Dashboard",
  components: {Title},
  data() {
    return {
      title: "Dashboard"
    }
  },
};
</script>

<style scoped>
.title {
  margin-top: 10px;
  margin-left: 10px;
}
</style>