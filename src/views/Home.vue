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
                v-model="minecraft.username"
                label="Username or Email 👤"
                name="login"
                type="text"
              />
              <v-checkbox
                v-model="minecraft.autoconnect"
                class="mx-2"
                label="Auto Connect to Sever 🔌"
              ></v-checkbox>
              <v-checkbox v-model="minecraft.isMojang" class="mx-2" label="Mojang Account 🔐"></v-checkbox>
              <v-text-field
                v-if="minecraft.isMojang"
                v-model="minecraft.password"
                id="password"
                label="Password"
                name="password"
                type="password"
              />
              <v-subheader
                v-if="minecraft.isMojang"
              >Your credentials will be shared only with mojang!</v-subheader>
              <v-divider></v-divider>
              <v-expansion-panels flat>
                <v-expansion-panel>
                  <v-expansion-panel-header>Memory Settings ⚙️</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row justify="space-around">
                      <v-col cols="12">
                        <v-slider
                          thumb-label="always"
                          v-model="minecraft.min"
                          min="512"
                          max="768"
                          label="Min"
                        ></v-slider>
                      </v-col>
                      <v-col cols="12">
                        <v-slider
                          thumb-label="always"
                          v-model="minecraft.max"
                          min="512"
                          max="8000"
                          label="Max"
                        ></v-slider>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel v-if="minecraft.logShow">
                  <v-expansion-panel-header>Log ⚙️</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row justify="space-around">
                      <v-col cols="12">
                        <v-textarea row-height="10" auto-grow outlined :value="minecraft.status"></v-textarea>
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
            <v-progress-circular
              v-if="minecraft.progress > 0"
              :value="minecraft.progress"
              max="1100"
            ></v-progress-circular>
            <v-spacer />
            <v-btn
              :disabled="minecraft.minecraftStarted"
              @click="start"
              color="primary"
            >Start Gaming 🔫</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import clone from "../async_clone";
import { mapState } from "vuex";
const { join } = require("path");
const { ipcRenderer } = require("electron");
const { Authenticator } = require("minecraft-launcher-core");
export default {
  name: "Home",
  computed: mapState(["minecraft"]),
  methods: {
    async start() {
      let vm = this.minecraft;
      try {
        const authorization = Authenticator.getAuth(
          this.minecraft.username,
          this.minecraft.password
        );
        let opts = {
          authorization,
          root: join(require("os").homedir(), ".minecraft"),
          version: {
            number: "1.12.2",
            type: "release"
          },
          forge: join(
            require("os").homedir(),
            ".minecraft",
            "forge-1.12.2-14.23.5.2768-universal.jar"
          ),
          memory: {
            max: this.minecraft.max,
            min: this.minecraft.min
          },
          server: {
            host: "minecraft.0x77.page"
          }
        };
        if (!this.minecraft.autoconnect) delete opts.server;
        this.minecraft.minecraftStarted = true;
        this.minecraft.logShow = true;
        try {
          this.minecraft.status =
            this.minecraft.status + "\n" + "Updating Mods";
          await clone(
            "devmcraft/modpack",
            join(require("os").homedir(), ".minecraft", "mods")
          );
          this.minecraft.status =
            this.minecraft.status + "\n" + "Updating Forge";
          await clone(
            "devmcraft/minecraft-forge",
            join(require("os").homedir(), ".minecraft")
          );
          console.log(opts);
          this.minecraft.opts = opts;
          fetch("http://localhost:1033");
        } catch (error) {
          alert("Cannot download mods " + error);
        }
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
