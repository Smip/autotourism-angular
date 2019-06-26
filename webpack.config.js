const path = require('path');
const webpack = require('webpack');


const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
  mode: 'development',
  externals: [/(node_modules|main\..*\.js)/],
  entry: {
    // This is our Express server for Dynamic universal
    server: './server.ts',
    // This is an example of Static prerendering (generative)
    prerender: './prerender.ts',
  },
  resolve: {extensions: ['.js', '.ts']},
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname),
    filename: '[name].js',
  },
  module: {
    rules: [
      {test: /\.ts$/, loader: 'ts-loader'}
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {}, // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {},
    ),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru|uk/),
    new NormalModuleReplacementPlugin(/quill.js/, path.resolve(__dirname, 'src/app/shared/servermocks/quill.js')),
    new NormalModuleReplacementPlugin(/ngx-quill/, path.resolve(__dirname, 'src/app/shared/servermocks/quillmodule.mock.ts'))
  ],
  target: 'node',
  node: {
    __dirname: false,
  },
};
