<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <Navbar />
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quia est
      id ducimus perferendis adipisci! Dignissimos, exercitationem saepe eum
      neque quas tenetur dolorum sapiente commodi reiciendis quibusdam corporis
      repellat rem.
    </h1>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "Home",
  components: {Navbar},
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
