import axios from "@/utils/request.js"
// 获取用户
export const get_users = (data) => {
    return axios.request({
        method: 'post',
        url: '/user/getList/',
        data: data
    })
}

// 添加用户
export const add_user = (data) => {
    return axios.request({
        method: "post", //post请求
        url: "/user/add/",
        data: data
    })
}