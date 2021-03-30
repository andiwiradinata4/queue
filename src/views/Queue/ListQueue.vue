<template>
  <v-app id="list-queue"><Title v-bind:title="title" /></v-app>
</template>

<script>
import Title from '@/components/ViewTitle.vue'

export default {
  name: "ListQueue",
  components: {Title},
  data() {
    return {
      title: "List Queue"
    }
  },

}
</script>

