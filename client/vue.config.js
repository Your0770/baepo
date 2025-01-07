const { defineConfig } = require('@vue/cli-service')
const target = 'http://localhost:3000';

var path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir : path.resolve("../server/public"),
  devServer : {
    proxy : {
      '^/api' : {
        target,
        changeOrigin : true,
        ws : false,
        pathRewrite : { '^/api' :'/' }
      }
    }
  },

  pluginOptions: {
    vuetify: {}
  }
})
