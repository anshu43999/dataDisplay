module.exports = {
    // 修改的配置
    publicPath:"./",
    configureWebpack: {
        //关闭 webpack 的性能提示
        performance: {
            hints: false
        }
    }
};