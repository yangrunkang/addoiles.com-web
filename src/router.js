const routers = [
    {
        path: '/',
        meta: {
            title: '主页'
        },
        /*默认Addoiles.vue作为主页*/
        component: (resolve) => require(['./views/Addoiles.vue'], resolve)
    },
    {
        path: '/Dreams',
        meta: {
            title: '梦想墙'
        },
        component: (resolve) => require(['./views/Dreams.vue'], resolve)
    },
    {
        path: '/Experience',
        meta: {
            title: '经历分享'
        },
        component: (resolve) => require(['./views/Experience.vue'], resolve)
    },
    {
        path: '/ITTech',
        meta: {
            title: '技术沉淀'
        },
        component: (resolve) => require(['./views/ITTech.vue'], resolve)/*,
        children: [
            { path: '/SoftwareTalk', component: (resolve) => require(['./views/SoftwareTalk.vue'], resolve), name: '主页', hidden: true }
        ]*/
    },
    {
        path: '/OilRobot',
        meta: {
            title: 'OilRobot'
        },
        component: (resolve) => require(['./views/OilRobot.vue'], resolve)
    },
    {
        path: '/UserInfo',
        meta: {
            title: '用户中心'
        },
        component: (resolve) => require(['./views/UserInfo.vue'], resolve)
    }



];
export default routers;