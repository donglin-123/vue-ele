import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, getUsername } from './cookie'
// const BASEURL = process.env.NODE_ENV === 'development' ? '/api' : '' //api
let BASEURL = null
    // 使用本地的mock数据 true   如果走后台代理 false
const mock = false
if (mock) {
    // 用本地的mock数据
    BASEURL = process.env.NODE_ENV === 'development' ? '' : ''
} else {
    // 走后台代理
    BASEURL = process.env.NODE_ENV === 'development' ? '/api' : ''
}

const http = axios.create({
        baseURL: BASEURL //http://localhost:8080/api/getSms/ 只要是url中/api都是接口请求
    })
    // const BASEURL = process.env.NODE_ENV == 'development' ? '/api' : '' //api 做标识
    // console.log(BASEURL)
    // const http = axios.create({
    //     // 等价于下面
    //     // baseURL: 'http://www.web-jshtml.cn/productapi/'
    //     baseURL: BASEURL //http://localhost:8080/api/getSms 只要url中开头是 /api 都是借口请求
    // })
    // 跨域 指的是浏览器由于同源策略，不同域名，就会出现跨域，但是如果是两个后台发起网络请求就不存在跨域
    // http.defaults.baseURL = 'https://www.baidu.com/' //https://www.baidu.com/getSms
    // http.defaults.baseURL = 'http://www.web-jshtml.cn/c/'
const tokenWhite = ['/getSms/', '/login/', '/register/']

// 添加请求拦截器
http.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // 手动添加头参数 token userId csrf
    if (tokenWhite.indexOf(config.url) !== -1) { //访问的是不需要token的接口
        return config

    } else { //访问的是需要token的接口
        if (getToken() && getUsername()) {
            config.headers['Tokey'] = getToken()
            config.headers.UserName = getUsername()
            return config
        } else {
            const message = 'token或用户名失效 请重新登录'
            Message.error(message); //提示邮箱不能为空！！
            return Promise.reject({ error: message });


        }

    }

}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function(response) {

    // console.log(response);
    // 对响应数据做点什么 对数据进行过滤
    if (response.data.resCode != 0) {
        // 提示服务器返回的信息
        // Message.error(response.data.message) //提示邮箱不能为空！！
        return Promise.reject({ error: response.data.message });
    }

    return response;
}, function(error) {
    // 对响应错误做点什么
    // console.log('响应拦截')
    return Promise.reject(error);
});

export default http