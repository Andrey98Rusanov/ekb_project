import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

interface BuildEnv {
  mode?: 'development' | 'production';
  port?: number;
}

export default (env: BuildEnv) => {
  const mode = env?.mode || 'development';
  const PORT = env?.port || 3000;
  const isDev = mode === 'development';

  const config: webpack.Configuration = {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev
      ? {
          port: PORT,
          open: true,
          historyApiFallback: true,
          hot: true,
        }
      : undefined,
  };

  return config;
};

