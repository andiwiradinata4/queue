<template>
  <v-app id="login">
    <form action="submit">
      <v-container class="box-login">
        <v-row>
          <v-col cols="12">
            <h1 class="title">{{ title }}</h1>

            <v-text-field
              v-model="field.userId.value"
              :rules="field.userId.rules"
              :placeholder="field.userId.placeHolder"
              :label="field.userId.label"
              required
            ></v-text-field>

            <v-text-field
              v-model="field.password.value"
              :rules="field.password.rules"
              :placeholder="field.password.placeHolder"
              :label="field.password.label"
              required
              type="password"
            ></v-text-field>
          </v-col>

          <v-row id="forgot-password" class="pt-0">
            <v-col cols="12" class="pt-0 pr-5 text-right">
              <router-link to="#">Forgot Password?</router-link>
            </v-col>
          </v-row>
        </v-row>

        <v-row class="mt-6">
          <v-col cols="12" class="pt-0">
            <v-btn color="primary" width="100%" height="40px" @click="pLogin">{{
              btnLogin.text
            }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </form>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      title: "Please Sign In",
      btnLogin: {
        icon: "add_circle_outline",
        text: "Sign In",
        color: "primary",
      },
      field: {
        userId: {
          value: "",
          placeHolder: "",
          label: "User ID",
          rules: [(v) => !!v || "User ID is required!"],
        },
        password: {
          value: "",
          placeHolder: "",
          label: "Password",
          rules: [(v) => !!v || "Password is required!"],
        },
      },
    };
  },
  methods: {
    ...mapActions(["setAuthenticate"]),
    pLogin() {
      this.setAuthenticate();
      this.$router.replace({ name: "Dashboard" });
      console.log(`
      UserID: [${this.field.userId.value}]
      Password: [${this.field.password.value}]
      Auth: [${this.$store.getters.getAuthenticate}]
      `);

      // console.log(this.$emit("authenticated"));
    },
  },
};
</script>

<style scoped>
#login {
  background: #f5f5f5;
}

form {
  display: block;
  background: white;
  width: 25%;
  height: 300px;
  margin-bottom: 10%;
  margin-top: 10%;
  margin-left: 37.5%;
  margin-right: 37.5%;
  border-radius: 15px;
  box-shadow: 1px 2px 5px 1px lightslategray;
}

.title {
  font-size: 20px !important;
  text-align: center !important;
}

.box-login {
  padding: 30px;
}

#forgot-password a {
  font-size: 12px;
}
</style>