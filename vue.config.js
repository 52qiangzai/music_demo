const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/": {
        target: "http://vue-music-api.q6q.cc",
        changeOrigin: true,
      },
    },
  },
});
