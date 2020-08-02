module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      customFileProtocol: './',
      builderOptions: {
        publish: ['github'],
      },
    },
  },
};
