<template>
  <v-card>
    <v-card-title class="headline blue-grey lighten-5">
      Create New Driver
      <v-spacer></v-spacer>

      <Button :callback="pNew" :properties="btnSave" />
      <Button :callback="pClose" :properties="btnClose" />
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="mt-2">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non eos
      architecto fugit mollitia unde maxime sapiente nihil sunt quod velit
      facere, quos ipsa in, veritatis magni quidem blanditiis adipisci laborum.
    </v-card-text>
  </v-card>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  name: "DriverDetail",
  components: { Button },
  data() {
    return {
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
      console.log('Press new');
    },
    pClose() {
      console.log('Press close');
    },
    pSetColor(data) {
      if (data == "IN-ACTIVE") return "pink";
      if (data == "BLACKLIST") return "normal";
      else return "success";
    },
  },
};
</script>

<style scoped>
</style>