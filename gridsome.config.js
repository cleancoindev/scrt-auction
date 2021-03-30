// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Secret Auctions",
  plugins: [
    {
      use: "@gridsome/vue-remark",
      options: {
        typeName: "Content",
        baseDir: "./content",
        path: "/",
        template: "./src/templates/Content.vue",
      },
    },
    {
      use: 'gridsome-plugin-vue-toasted',
      options: {
        iconPack : 'material',
        position: "top-right",
        keepOnHover: true,
        closeOnSwipe: true,
        theme: "outline",
        className: "override",
        duration : 7000
      }
    }
  ],

  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },
};
