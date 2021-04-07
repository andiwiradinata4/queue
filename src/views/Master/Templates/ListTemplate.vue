<template>
  <v-app id="list-queue">
    <div id="btn-queue" class="d-flex flex-row btn-header">
      <div class="list-title">
        {{ title }}
      </div>

      <v-spacer></v-spacer>

      <div id="btn-driver">
        <Button :callBack="pNew" :properties="btnNew" />
        <Button :callBack="pRefresh" :properties="btnRefresh" />
      </div>
    </div>
    <v-divider></v-divider>
  </v-app>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "ListTemplate",
  components: {
    Button,
  },
  data() {
    return {
      title: "Template",
      buttons: [
        {
          id: 1,
          properties: { icon: "refresh", text: "Refresh", color: "primary" },
        },
      ],
      btnNew: {
        icon: "add_circle_outline",
        text: "New",
        color: "primary",
      },
      btnDetail: {
        icon: "mode_edit",
        text: "Edit",
        color: "primary",
      },
      btnRefresh: {
        icon: "refresh",
        text: "Refresh",
        color: "primary",
      },
      btnSave: {
        icon: "done",
        text: "Save",
        color: "primary",
      },
      btnClose: {
        icon: "close",
        text: "Close",
        color: "normal",
        outlined: true,
      },
    };
  },
  methods: {
    pNew() {
      this.dialog = true;
    },
    pView(data) {
      console.log("Press detail " + data);
    },
    pRefresh() {
      this.snackbar.isActive = true;
      this.snackbar.text = "Press refresh";
    },
    pClose() {
      this.dialog = false;
    },
    pSetColor(data) {
      if (data == "IN-ACTIVE") return "pink";
      if (data == "BLACKLIST") return "normal";
      else return "success";
    },
  },
  computed: {
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
    },
  },
};
</script>

<style scoped>
.v-chip.v-size--default {
  width: 100px;
  display: inline-block !important;
  text-align: center;
}

</style>