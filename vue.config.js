module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: ['github'],
        appId: "page.a0x77.minecraft.launcher",
        productName: "0x77dev Minecraft Launcher",
        copyright: "Misha Marinenko",
        mac: {
          target: "dmg"
        },
        linux: {
          target: "AppImage",
          maintainer: "Misha Marinenko",
          vendor: "0x77dev",
          synopsis: "Description",
          category: "System",
        },
        appImage: {
          artifactName: "app.bin"
        }
      },
    },
    configureWebpack: {
      devtool: 'source-map',
      plugins: [new (require("webpackbar"))({ name: "0x77dev Minecraft Launcher" })]
    }
  }
}