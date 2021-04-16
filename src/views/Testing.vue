<template>
  <div>
    <h1>Test [ {{count}} ]</h1>
    <Button :callBack="pRefresh" :properties="btnRefresh" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "@/components/Button.vue";

export default {
  name: "Testing",
  components: {
    Button
  },
  data() {
    return {
      btnRefresh: {
        icon: "refresh",
        text: "Refresh",
        color: "primary"
      }
    };
  },
  methods: {
    pRefresh() {
      this.$store.state.count += 100;
      console.log(this.$store.state.count);
    }
  },
  computed: {
    ...mapGetters({ count: "getCount" })
  }
};
</script>