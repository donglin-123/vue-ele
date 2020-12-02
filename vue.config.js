// const path = require('path');
// // console.log('项目的绝对路径', _dirname);
// // console.log('项目中某个目录中的绝对路径', path.resolve(_dirname, './src/components'));
// // 配置目录的别名
// configureWebpack: (config) => {
//     config.resolve = {
//         extensions: ['.js', '.json', '.vue'],
//         alias: {
//             "@c": path.resolve(_dirname, './src/components'),
//             "@a": path.resolve(_dirname, './src/assets'),
//             "@p": path.resolve(_dirname, './src/public'),
//             vue$: "vue/dist/vue.esm.js",
//             import vue from 'vue',
//         }
//     }
// }



// commonjs 规范是node.js的规范
module.exports = {
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: true,
        // css预设器配置项
        loaderOptions: {
            scss: {
                prependData: `@import "./src/styles/main.scss";`
            }
        },
    }

}