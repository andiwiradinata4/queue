<template>
  <v-app>
    <v-container class="pa-0 ml-0 mr-0">
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Dashboard",
  components: {
    // Button
  },
  data() {
    return {
      title: "Dashboard",
      buttons: [
        {
          id: 1,
          properties: { icon: "refresh", text: "Refresh", color: "primary" }
        }
      ],
      btnNew: {
        icon: "add_circle_outline",
        text: "New",
        color: "primary"
      },
      btnDetail: {
        icon: "mode_edit",
        text: "Edit",
        color: "primary"
      },
      btnRefresh: {
        icon: "refresh",
        text: "Refresh",
        color: "primary"
      },
      btnSave: {
        icon: "done",
        text: "Save",
        color: "primary"
      },
      btnClose: {
        icon: "close",
        text: "Close",
        color: "normal",
        outlined: true
      }
    };
  },
  methods: {
    // ...mapActions(["setIncrement"]),
    ...mapActions({ pRefresh: "setIncrement" }),
    pNew() {
      this.dialog = true;
    },
    pView(data) {
      console.log("Press detail " + data);
    },
    // pRefresh() {
    //   // this.snackbar.isActive = true;
    //   // this.snackbar.text = "Press refresh";
    //   this.$store.dispatch("setIncrement");
    //   // this.setIncrement();
    //   // this.count = this.$store.getters.getCount;
    //   console.log(this.$store.getters.getCount);
    // },
    pClose() {
      this.dialog = false;
    },
    pSetColor(data) {
      if (data == "IN-ACTIVE") return "pink";
      if (data == "BLACKLIST") return "normal";
      else return "success";
    }
  },
  computed: {
    ...mapGetters({ count: "getCount" }),

    tableHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 300;
        case "md":
          return 300;
        case "lg":
          return 350;
        default:
          return 600;
      }
    }
    // count() {
    //   // return this.$store.getters.getCount;
    //   // return this.getCount;
    // },
  },
  mounted() {
    // this.count = this.$store.getters.getCount;
    // this.setIncrement();
  }
};
</script>

<style scoped>
/* Container */
.container {
  max-width: 100%;
  max-height: 50%;
}

/* chip of status */
.v-chip.v-size--default {
  width: 100px;
  display: inline-block !important;
  text-align: center;
}
</style>

