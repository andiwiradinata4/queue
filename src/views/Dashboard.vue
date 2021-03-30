<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <Title v-bind:title="title" />
    <v-row>
      <v-col cols="11">
        <v-text-field label="Search" prepend-inner-icon="search"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn large><span class="material-icons"> input </span></v-btn>
        
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Title from '@/components/ViewTitle.vue'

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