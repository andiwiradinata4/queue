<template>
  <nav>
    <div>
      <v-toolbar>
        
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
      { title: "Driver", icon: "mdi-account", route: "/about" },
      {
        title: "Queue",
        icon: "mdi-format-list-bulleted-square",
        route: "/about",
      },
    ],
  }),
};
</script>
<style scoped>
.menu-active {
  border-left: 4px solid rgb(152, 238, 152);
}
</style>