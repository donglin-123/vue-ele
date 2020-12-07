import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);
Vue.use(ElementUI);
//系统默认的环境变量
// console.log(process.env.NODE_ENV)
/*自定义环境变量:
        如果是线下 npm run serve
              默认读取  .env.development
        如果是线上 npm run build
              默认读取  .env.production
*/
// 引入axios

import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false;
// 导入css入口文件
// import './styles/main.scss';
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");