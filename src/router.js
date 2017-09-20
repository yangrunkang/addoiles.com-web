const routers = [
    {
        path: '/',
        meta: {
            title: '主页'
        },
        /*默认Home.vue作为主页*/
        component: (resolve) => require(['./views/Home.vue'], resolve)
    },
    {
        path: '/Dreams',
        meta: {
            title: '梦想'
        },
        component: (resolve) => require(['./views/Dreams.vue'], resolve)
    },
    {
        path: '/Experience',
        meta: {
            title: '分享经历'
        },
        component: (resolve) => require(['./views/Experience.vue'], resolve)
    }



];
export default routers;