<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Mojang account</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="username" label="Login" name="login" type="text" />

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                type="password"
              />
            </v-form>
            <v-subheader>Your credentials will be shared only with mojang!</v-subheader>
          </v-card-text>
          <v-card-actions>
            <v-subheader style="max-width: 120px;">{{status}}</v-subheader>
            <v-progress-circular v-if="progress > 0" :value="progress"></v-progress-circular>
            <v-spacer />
            <v-btn @click="start" color="primary">Start</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    status: "",
    progress: 0,
    username: localStorage.username || "",
    password: localStorage.username || ""
  }),
  methods: {
    start() {
      let vm = this;
      const { Client, Authenticator } = require("minecraft-launcher-core");
      const launcher = new Client();

      let opts = {
        clientPackage: null,
        authorization: Authenticator.getAuth(this.username, this.password),
        root: "./minecraft",
        version: {
          number: "1.15.2",
          type: "release"
        },
        memory: {
          max: "6000",
          min: "4000"
        },
        server: {
          host: "minecraft.0x77.page"
        }
      };

      launcher.launch(opts);

      launcher.on("debug", e => (vm.status = e));
      launcher.on("data", e => (vm.status = e));
      launcher.on("progress", e => (vm.progress = e.total));
    }
  },
  watch: {
    username(username) {
      localStorage.username = username;
    },
    password(password) {
      localStorage.password = password;
    }
  }
};
</script>
