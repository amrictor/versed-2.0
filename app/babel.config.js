module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            containers: './src/containers',
            components: './src/components',
            utils: './src/utils',
          },
        },
      ],
      ['@babel/plugin-proposal-class-properties', {loose: true}],
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-transform-runtime'
    ],
  };
};
