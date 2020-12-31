import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [{
        path: "/",
        redirect: "/home",
        // 隐藏
        hidden: true,
        meta: {
            name: ""
        },
    },
    {
        path: "/home",
        name: "Home",
        hidden: false, // 显示
        meta: { // 自定义属性
            name: "控制台",
            icon: 'console'
        },
        component: () =>
            import ("../views/Layout/index.vue"),
        // 默认的首页
        redirect: "/index",
        children: [{
            path: "/index",
            name: "HomeIndex",
            meta: {
                name: "首页",
                keep: true
            },
            component: () =>
                import ("../views/Home/index.vue"),
        }]
    },
    {
        path: "/info",
        name: "Info",
        // 显示
        hidden: false,
        // 自定义属性
        meta: {
            name: "信息管理",
            icon: 'info'
        },
        component: () =>
            import ("../views/Layout/index.vue"),
        children: [{
                path: "/info",
                name: "infoIndex",
                meta: {
                    name: "信息列表",
                    keep: true
                },
                component: () =>
                    import ("../views/Info/index.vue"),
            },
            {
                path: "/infoCate",
                name: "infoCate",
                meta: {
                    name: "信息分类",
                    keep: true
                },
                component: () =>
                    import ("../views/Info/cate.vue"),
            },
            {
                path: "/infoDetail",
                name: "infoDetail",
                meta: {
                    name: "消息详情",
                    keep: true
                },
                hidden: true,
                component: () =>
                    import ("../views/Info/detail.vue"),
            }
        ]
    },
    {
        path: "/user",
        name: "User",
        // 显示
        hidden: false,
        // 自定义属性
        meta: {
            name: "用户管理",
            icon: 'user'
        },
        component: () =>
            import ("../views/Layout/index.vue"),
        children: [{
                path: "/userIndex",
                name: "userIndex",
                meta: {
                    name: "用户管理"
                },
                component: () =>
                    import ("../views/User/index.vue"),
            },
            {
                path: "/userCate",
                name: "userCate",
                meta: {
                    name: "用户分类"
                },
                component: () =>
                    import ("../views/User/cate.vue"),
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        // 隐藏
        hidden: true,
        meta: {
            name: "登录"
        },
        component: () =>
            import ("../views/Login/index.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;