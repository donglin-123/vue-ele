// 模块化导入path commn.js
const path = require("path");
// console.log('项目的绝对路径', _dirname);
// 输出绝对路径 C:\Users\MrDong\Desktop\vue-ele\src\components~
// console.log('某个目录的绝对路径', path.resolve(__dirname, './src/components'));
module.exports = {
    //基本路径
    publicPath: process.env.NODE_ENV === "production" ? '' : '',
    lintOnSave: false, //是否开启语法检测
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: true,
        // css预设器配置项a
        loaderOptions: {
            scss: {
                prependData: `@import "./src/styles/main.scss";`
            }
        },
    },
    // 配置目录别名
    configureWebpack: (config) => {
        config.resolve = {
            alias: {
                // 获取绝对路径  
                "@": path.resolve(__dirname, './src'),
                "@c": path.resolve(__dirname, './src/components'),
                "@a": path.resolve(__dirname, './src/assets'),
                "@p": path.resolve(__dirname, './public'),
                // 以vue结尾的
                vue$: "vue/dist/vue.esm.js"
            },
            // 引入文件的时候不写后缀，默认加载
            // extensions: ['.js', '.json', '.vue']
        }
    },
    devServer: {
        port: 8888,
        open: true, //启动项目会自动打开浏览器
        // 代理
        proxy: {
            // http://localhost:8080/api/getSms/
            // http://www.web-jshtml.cn/productapi/api/getSms/
            // bugLevel: 'debug', //打印代理的日志
            '/api': {
                target: 'http://www.web-jshtml.cn/productapi/', //目标 接口
                changeOrigin: true, //生成一个 localhost:8080 域名下的一个node服务器，帮你做代理
                // 重写 URL
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}