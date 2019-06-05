module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/globals/_module.scss";
        `
      }
    }
  }
};