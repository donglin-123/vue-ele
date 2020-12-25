import { MessageBox } from 'element-ui'
//自定义方法
export const comfrim = ({ content, tip, type, center, callback }) => {
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

// promise的方式
// export const comfrim = ({ content, tip, type, center }) => {
//     return new Promise((resolve, reject) => {
//         MessageBox.confirm(content, tip, {
//             confirmButtonText: '确定',
//             cancelButtonText: '取消',
//             type: type,
//             center: center
//         }).then(() => {
//             resolve('确定')
//         }).catch(() => {
//             reject('取消')
//         })
//     })
// }