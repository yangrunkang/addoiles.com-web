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
        component: (resolve) => require(['./views/ITTech.vue'], resolve)
    },
    {
        path: '/SoftwareTalk',
        meta: {
            title: '软件评测'
        },
        component: (resolve) => require(['./views/SoftwareTalk.vue'], resolve)
    }/*, TODO 抓取,现在不做
    {
        path: '/LiZhiFM',
        meta: {
            title: '程序员的生活记录'
        },
        component: (resolve) => require(['./views/LiZhiFM.vue'], resolve)
    }
*/


];
export default routers;