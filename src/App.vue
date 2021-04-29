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
    <v-footer color="primary lighten-1" fixed>
      <v-card color="grey" width="100%">
        <v-card-text class="white--text">
          2021 — {{ new Date().getFullYear() }} | <strong>Musim Mas</strong>
        </v-card-text>
      </v-card>
    </v-footer>
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
