const { withNextein } = require('nextein/config')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const EnvironmentPlugin = require('webpack/lib/EnvironmentPlugin')

module.exports = withNextein({
  webpack: (config) => {
    config.plugins.push(
      ...[      
        process.env.ANALYZE && 
        new BundleAnalyzerPlugin({
          analyzerMode: 'static'
        }),
        new EnvironmentPlugin({
          UA: 'UA-104061611-1'
        }),
        new ContextReplacementPlugin(
          /highlight\.js[/\/]lib[/\/]languages$/,
          /javascript|json|markdown|bash|yaml|xml/
        )
      ].filter(Boolean)
    )

    return config
  },

  exportPathMap: () => ({
    '/installation': { page: '/installation', query: {} }, // <-query is needed, otherwise shallow-eq returns error
    '/configuration': { page: '/configuration', query: {} }
  })
})
