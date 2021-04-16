<template>
  <div>
    <v-app v-if="authenticated == true">
      <Navbar />
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
    <v-app v-else>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {};
  },

  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "Login" });
    }
  },
  computed: {
    ...mapGetters({ authenticated: "getAuthenticate" })
  }

};
</script>
