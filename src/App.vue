<template>
  <div id="app">
    <span class="bg"></span>
    <v-app>
      <v-system-bar
        :fixed="true"
        height="40"
        color="black"
        dark
        style="-webkit-app-region: drag"
        lights-out
      >
        <v-spacer></v-spacer>0x77dev Minecraft Launcher
        <v-spacer></v-spacer>
      </v-system-bar>

      <v-content>
        <router-view></router-view>
      </v-content>
      <v-snackbar v-model="showUpdateMessage">
        {{ updateMessage }}
        <br />
        <v-progress-linear :value="updateProgress"></v-progress-linear>
      </v-snackbar>
      <v-footer :fixed="true">
        <v-avatar @click="open('https://github.com/devmcraft')" height="30" width="30">
          <img src="https://cdn.svgporn.com/logos/github-icon.svg" alt="Github" />
        </v-avatar>
        <v-spacer></v-spacer>
        <div>Misha Marinenko @0x77dev &copy; {{ new Date().getFullYear() }}</div>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: mapState(["updateMessage", "showUpdateMessage", "updateProgress"]),
  methods: {
    open(url) {
      const { shell } = require("electron");
      shell.openExternal(url);
    }
  }
};
</script>
<style>
html,
body,
main,
.theme--light.v-application {
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
  /* background-image: url("./assets/m-bg.jpg") no-repeat cover; */
}

.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  background: url("./assets/m-bg.jpg") no-repeat center center;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.25);
  filter: blur(15px);
  transform: scale(1.105);
}

::-webkit-scrollbar {
  display: none;
}
</style>