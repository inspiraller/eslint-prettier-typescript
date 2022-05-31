
module.exports = api => {
  const BABEL_ENV = api.env();
  const config = {
    presets: [
      ["@babel/preset-env", {targets: {node: 'current'}}],
      "@babel/preset-react",
      "@babel/preset-typescript"
    ],
    plugins: [
      ['@babel/plugin-transform-typescript']
    ],
  }

  if (BABEL_ENV === 'development') {
    // do stuff here...
  }

  return config
};