import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: '/Login'
    },
    {
        path: "/Home",
        name: "Home",
        component: () =>
            import ("../views/Home/index.vue")
    },
    {
        path: "/Login",
        name: "Login",
        component: () =>
            import ("../views/Login/index.vue")
    },

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

//路由守卫：登陆了才能跳转
router.beforeEach((to, form, next) => {
    // console.log(to); //从哪里来
    // console.log(form); //到哪里去
    // console.log(next); //下一步
    const isLogin = localStorage.getItem('ele_login') ? true : false;
    if (to.path === '/login') {
        next()
    } else {
        //是否登录，没有登陆的话返回到登录页面，如果登录了，就继续下一步next
        localStorage.setItem('ele_login', true);
        isLogin ? next() : next('/login')
    }

})

export default router;