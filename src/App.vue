<template>
  <v-app>
    <v-system-bar height="40" color="black" dark style="-webkit-app-region: drag" lights-out>
      <v-spacer></v-spacer>0x77dev Minecraft Launcher [ALPHA]
      <v-spacer></v-spacer>
      <v-icon>mdi-wifi-strength-3</v-icon>
    </v-system-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>
<style>
html,
body,
main {
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.25);
}
</style>