<template>
  <nav>
    <v-app-bar color="teal darken-2" dark app permanent>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Queue Management System</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- User -->
      <v-chip class="ma-2" color="transparent" text-color="white">
        <v-avatar left>
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>S1704029
      </v-chip>

      <!-- Logout -->
      <v-btn outlined class="ml-2">
        <v-icon class="mr-2">logout</v-icon>Logout
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app @transitionend="collapseItems">
      <v-list>
        <!-- Dashboard -->
        <v-list-item
          v-for="item in menuDashboard"
          :key="item.id"
          router
          :to="item.route"
          active-class="white--text teal darken-2"
          @click="scrollToTop"
        >
          <template>
            <v-list-item-action class="mr-5">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>

        <!-- Master -->
        <v-list-group :value="group" active-class="grey--text">
          <template v-slot:activator>
            <v-icon class="mr-5">source</v-icon>

            <v-list-item-title>Master</v-list-item-title>
          </template>

          <v-list-item
            v-for="item in menuMaster"
            :key="item.id"
            link
            :to="item.route"
            active-class="white--text teal darken-2"
            @click="scrollToTop"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- Transaction -->
        <v-list-group :value="group" active-class="grey--text">
          <template v-slot:activator>
            <v-icon class="mr-5">sticky_note_2</v-icon>

            <v-list-item-title>Transaction</v-list-item-title>
          </template>

          <v-list-item
            v-for="item in menuTransaction"
            :key="item.id"
            link
            :to="item.route"
            active-class="white--text teal darken-2"
            @click="scrollToTop"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    drawer: false,
    group: false,
    person: false,
    menuDashboard: [
      {
        id: 1,
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        route: "/"
      }
    ],
    menuMaster: [
      { id: 1, title: "Driver", icon: "mdi-account", route: "/driver" },
      {
        id: 2,
        title: "Point",
        icon: "place",
        route: "/point"
      },
      {
        id: 3,
        title: "Point Sub",
        icon: "place",
        route: "/pointsub"
      },
      {
        id: 4,
        title: "Timeline",
        icon: "table_chart",
        route: "/timeline"
      }
    ],
    menuTransaction: [
      { id: 1, title: "Queue", icon: "queue", route: "/queue" }
    ],
    items: [
      {
        id: 1,
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        route: "/"
      },
      {
        id: 2,
        title: "Driver",
        icon: "mdi-account",
        route: "/driver"
      },
      {
        id: 3,
        title: "Queue",
        icon: "queue",
        route: "/queue"
      },
      {
        id: 4,
        title: "Template",
        icon: "table_chart",
        route: "/template"
      }
    ]
  }),
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    collapseItems() {
      this.group = false;
    }
  }
};
</script>
<style scoped>
</style>