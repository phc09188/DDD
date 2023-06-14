const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');

const babelLoaderConfiguration = {
  test: /\.(js|ts)$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['@babel/preset-react'],
      plugins: ['react-native-web'],
      include:[
        path.resolve(appDirectory, 'node_modules/react-native/Libraries'),
      ]
    }
  }
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    }
  }
};

module.exports = {
  entry: [
    path.resolve(appDirectory, 'index.web.js')
  ],
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist')
  },

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration
    ]
  },

  plugins:[new HtmlWebpackPlugin({ template: './public/index.html'})],

  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      '../Utilities/Platform':'react-native-web/dist/exports/Platform',
      '../Utilities/BackHandler':'react-native-web/dist/exports/BackHandler',
      '../../Utilities/Platform':'react-native-web/dist/exports/Platform',
      './Platform':'react-native-web/dist/exports/Platform',
     // './PlatformColorValueTypes' :'react-native-web/dist/exports/PlatformColorValueTypes',
     // './RCTAlertManager':'react-native-web/dist/exports/RCTAlertManager',
      //'../../StyleSheet/PlatformColorValueTypes':'react-native-web/dist/exports/PlatformColorValueTypes',
      '../../Image/Image':'react-native-web/dist/exports/Image',
     //"./BaseViewConfig":"react-native-web/dist/exports/BaseViewConfig",
    },
    extensions: [ '.web.js', '.js', ".android.js" ,".ios.js"]
  }
}