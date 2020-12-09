// 请求和响应拦截
import axios from "@/utils/request.js"




//获取验证码
export const get_code = (data) => {
        // console.log(process.env.NODE_ENV)
        //     // mock模拟数据 :必须get方式
        return axios.request({
            url: "/mock/code.json",
            method: "get",
            data: {
                "username": '123@qq.com'
            }
        })

        // return axios.request({
        //     method: "post", //post请求
        //     url: "/getSms/",
        //     //post请求写 data
        //     // data:data
        //     //     //get请求写 params
        //     //     // params: {

        //     //     //     firstName: "Fred",
        //     //     //     lastName: "Flintstone"
        //     //     // }
        //     data: data
        // })
    }
    //登录
export const do_login = (data) => {
        return axios.request({
            method: "post", //post请求
            url: "/login/",
            data: data
        })
    }
    //注册
export const do_register = (data) => {
    return axios.request({
        method: "post", //post请求
        url: "/register/",
        data: data
    })
}