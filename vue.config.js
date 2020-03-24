module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: ['github']
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [new (require("webpackbar"))({ name: "0x77dev Minecraft Launcher" })]
  }
}