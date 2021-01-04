// Vue 3.0 的操作
import { reactive } from '@vue/composition-api'
import { get_all_category } from '@/api/info'
import axios from "@/utils/request.js"
//多个组件之间 只要是重新调用了 组件之间的响应式是不存在的
export const common = () => {
        //分类信息
        const category = reactive({
            item: []

        })
        const getCategoryAll = () => {
            // 发送请求
            get_all_category({}).then(res => {
                // console.log('common', res.data.data)
                category.item = res.data.data
            }).catch(err => {

            })
        }
        return {
            category,
            getCategoryAll
        }
    }
    //表格请求
export const loadTableData = ({ method, url, data }) => {
    return axios.request({
        method: method,
        url: url,
        data: data
    })

}