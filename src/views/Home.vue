<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Hey There 👋</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                label="Username or Email 👤"
                name="login"
                type="text"
              />
              <v-checkbox v-model="autoconnect" class="mx-2" label="Auto Connect to Sever 🔌"></v-checkbox>
              <v-checkbox v-model="isMojang" class="mx-2" label="Mojang Account 🔐"></v-checkbox>
              <v-text-field
                v-if="isMojang"
                v-model="password"
                id="password"
                label="Password"
                name="password"
                type="password"
              />
              <v-subheader v-if="isMojang">Your credentials will be shared only with mojang!</v-subheader>
              <v-divider></v-divider>
              <v-expansion-panels flat>
                <v-expansion-panel>
                  <v-expansion-panel-header>Memory Settings ⚙️</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row justify="space-around">
                      <v-col cols="12">
                        <v-slider
                          thumb-label="always"
                          v-model="min"
                          min="512"
                          max="768"
                          label="Min"
                        ></v-slider>
                      </v-col>
                      <v-col cols="12">
                        <v-slider
                          thumb-label="always"
                          v-model="max"
                          min="512"
                          max="8000"
                          label="Max"
                        ></v-slider>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel v-if="logShow">
                  <v-expansion-panel-header>Log ⚙️</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row justify="space-around">
                      <v-col cols="12">
                        <v-textarea row-height="10" auto-grow outlined :value="status"></v-textarea>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="open('https://minecraft.0x77.page')" text>server website 👥</v-btn>
            <v-spacer />
            <v-progress-circular v-if="progress > 0" :value="progress" max="1100"></v-progress-circular>
            <v-spacer />
            <v-btn :disabled="minecraftStarted" @click="start" color="primary">Start Gaming 🔫</v-btn>
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
    password: localStorage.password || "",
    min: 1000,
    max: 2000,
    minecraftStarted: false,
    isMojang: false,
    autoconnect: false
  }),
  methods: {
    async start() {
      let vm = this;
      const { Client, Authenticator } = require("minecraft-launcher-core");
      const { join } = require("path");
      const launcher = new Client();
      try {
        const authorization = Authenticator.getAuth(
          this.username,
          this.password
        );
        let opts = {
          clientPackage: null,
          authorization,
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
        if (!this.autoconnect) delete opts.server;
        const minecraft = launcher.launch(opts);
        launcher.on("close", e => (vm.minecraftStarted = flase));
        this.minecraftStarted = true;
        this.logShow = true;
        this.status = "";
        launcher.on("debug", e => (vm.status = vm.status + "\n" + e));
        launcher.on("data", e => (vm.status = vm.status + "\n" + e));
        launcher.on("progress", e => (vm.progress = e.total));
      } catch (error) {
        alert(error);
        throw new Error(error);
      }
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
