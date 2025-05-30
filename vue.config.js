const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 添加这一行：配置生产环境的基础路径
  publicPath: process.env.NODE_ENV === 'production'
    ? '/liuxinlin/' // 替换为你的 GitHub 仓库名称（小写）
    : '/'
})
