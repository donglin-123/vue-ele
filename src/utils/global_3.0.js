// Vue 3.0 的操作
import { ref } from '@vue/composition-api'
import { MessageBox } from 'element-ui'
export const global = () => {
    const confirm = ({ content, tip, type, center, callback, id }) => {
        MessageBox.confirm(content, tip, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type,
            center: center
        }).then(() => {
            //如果存在就调用
            callback && callback(id)
        }).catch(() => {

        })
    }
    return {
        // str,
        confirm
    }
}