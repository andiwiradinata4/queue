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

    <!-- Footer -->
    <!-- <v-footer padless style="background-color:#004D40;margin-top:100%">
      <v-col class="teal darken-2" style="text-align: center; color:white">
        © 2021 — {{ new Date().getFullYear() }} | <strong>Musim Mas</strong>
      </v-col>
    </v-footer> -->

    <!-- <v-bottom-navigation color="indigo">
      <v-btn>
        <span>Recents</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>

        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation> -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Navbar,
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
    ...mapGetters({ authenticated: "getAuthenticate" }),
  },
};
</script>
