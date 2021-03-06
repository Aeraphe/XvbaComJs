//@ts-check

'use strict';

require('dotenv').config();

const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const copyFiles  = new CopyPlugin({
  patterns: [
    {
      from: "*.md",
      to: "./",
    },
    {
      from: "*package.json",
      to: "./",
    },
  ],
});

const env = process.env;

console.log(env.NODE_ENV);
const pl = [];

const ugyfy = () => {
  if (env.NODE_ENV === "DEV") {
    console.log("DEV");
    return;
  } else {
    console.log("production");
    pl.push(new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma:2016,
      },
    }))
  }
};
ugyfy();

/**@type {import('webpack').Configuration}*/
const config = {
  plugins: [...pl,copyFiles],
  optimization: {
    minimize: env.NODE_ENV === "DEV" ? false : true,

  },
  target: 'node', // vscode extensions run in a Node.js-context ?? -> https://webpack.js.org/configuration/node/

  entry: {
    index: './src/index.ts',

  }, 
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), ?? -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'dist'),
    filename: './[name].js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    fsevents: "require('fsevents')",
    "ffi-napi": "ffi-napi",
    'ref-napi' :  'ref-napi',
    'any-promise' : 'any-promise'
  },
  resolve: {
    // support reading TypeScript and JavaScript files, ?? -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
};
module.exports = config;