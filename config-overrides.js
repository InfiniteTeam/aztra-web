const { override, addWebpackModuleRule } = require("customize-cra")

module.exports = override(
    addWebpackModuleRule({test: /\.(md|txt)$/, use: 'raw-loader'}),
    config => ({
        ...config,
        devtool: 'source-map'
    })
)