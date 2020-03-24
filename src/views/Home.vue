<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
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
              <v-subheader>Your credentials will be shared only with mojang!</v-subheader>
              <v-divider></v-divider>
              <v-subheader>Memory Settings</v-subheader>
              <v-row justify="space-around">
                <v-col cols="12">
                  <v-slider thumb-label="always" v-model="min" min="512" max="768" label="Min"></v-slider>
                </v-col>
                <v-col cols="12">
                  <v-slider thumb-label="always" v-model="max" min="512" max="8000" label="Max"></v-slider>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="open('https://minecraft.0x77.page')" color="primary">/op @p</v-btn>
            <v-spacer />
            <v-subheader style="max-width: 420px;">{{status}}</v-subheader>
            <v-progress-circular v-if="progress > 0" :value="progress" max="1100"></v-progress-circular>
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
    password: localStorage.username || "",
    min: 1000,
    max: 2000
  }),
  methods: {
    async start() {
      let vm = this;
      const { Client, Authenticator } = require("minecraft-launcher-core");
      const { join } = require("path");
      const launcher = new Client();
      let opts = {
        clientPackage: null,
        authorization: Authenticator.getAuth(this.username, this.password),
        root: join(require("os").homedir(), ".minecraft"),
        version: {
          number: "1.15.2",
          type: "release"
        },
        memory: {
          max: this.max,
          min: this.min
        },
        server: {
          host: "minecraft.0x77.page"
        }
      };
      launcher.launch(opts);
      launcher.on("debug", e => (vm.status = e));
      launcher.on("data", e => (vm.status = e));
      launcher.on("progress", e => (vm.progress = e.total));
    },
    open(url) {
      const { shell } = require("electron");
      shell.openExternal(url);
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
