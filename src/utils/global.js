Vue 2.0 的操作
import { MessageBox } from 'element-ui'
export default {
    install(Vue) {
        Vue.prototype.confrim = ({ content, tip, type, center, callback }) => {
            MessageBox.confirm(content, tip, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: type,
                center: center
            }).then(() => {
                //如果存在就调用
                callback && callback()
            }).catch(() => {

            })
        }
    }
}