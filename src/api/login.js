// 请求和响应拦截
import axios from "@/utils/request.js"



//获取验证码
export const get_code = (data) => {
        console.log(process.env.NODE_ENV)
        return axios.request({
            method: "post", //post请求
            url: "/getSms/",
            //post请求写 data
            // data:data
            //get请求写 params
            // params: {

            //     firstName: "Fred",
            //     lastName: "Flintstone"
            // }
            data: data
        })
    }
    //登录

//注册