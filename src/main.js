import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
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