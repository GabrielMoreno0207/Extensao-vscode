const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: './media/script.js', // Caminho para o arquivo JavaScript principal
  output: {
    filename: 'bundle.js', // Nome do arquivo de saída
    path: path.resolve(__dirname, 'dist') // Diretório de saída
  }
};
