import axios from 'axios'
import { Message } from 'element-ui'
// const BASEUSRL = process.env.NODE_ENV === 'development' ? '/api' : '' //api

let BASEUSRL = null

const mock = true
if (mock) {
    //使用本地的代理数据
    BASEUSRL = process.env.NODE_ENV === 'development' ? '' : '' //api
} else {
    BASEUSRL = process.env.NODE_ENV === 'development' ? '/api' : '' //api
}

const http = axios.create({
        baseURL: BASEUSRL //http://localhost:8080/api/getSms/ 只要URL里面有api开头的都是接口请求 
    })
    //跨域 浏览器由于同源策略 不同域名的请求就会出现跨域，但是如果两个是后台发起的网络请求就不存在跨域
    // http.defaults.baseURL = 'https:www.baidu.com/'

//添加请求拦截器  （给每个用户 token码做标记，识别用户）
http.interceptors.request.use(function(config) {
    //在发送之前做什么
    // console.log('请求参数', config.headers)
    //手动添加请求头参数 token userId
    return config;

}, function(error) {
    //对请求错误做什么
    // console.log("请求拦截");
    return Promise.reject(error)
});

//添加响应拦截器
http.interceptors.response.use(function(response) {

    //对相应数据做什么 数据进行过滤
    if (response.data.resCode != 0) {
        //提示服务器返回的信息
        Message.error(response.data.message);
        return Promise.reject(error)
    }
    return response
}, function(error) {
    //对响应错误做什么
    // console.log("响应拦截")
    return Promise.reject(error)
});

export default http