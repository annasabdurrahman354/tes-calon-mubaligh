module.exports = function (api: { cache: (arg0: boolean) => void }) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', 'react-native-paper/babel'],
  }
}
