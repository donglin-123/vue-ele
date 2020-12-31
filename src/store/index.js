import Vue from "vue";
import Vuex from "vuex";
import app from './modules/app'
import params from './modules/params'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { app, params }
});