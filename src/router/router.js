const routers = [
    {
        path: '/',
        meta: {
            title: '主页'
        },
        /*默认Addoiles.vue作为主页*/
        component: (resolve) => require(['../views/Addoiles.vue'], resolve)
    },
    {
        path: '/Dreams',
        meta: {
            title: '梦想墙'
        },
        component: (resolve) => require(['../views/Dreams.vue'], resolve)
    },
    {
        path: '/Experience',
        meta: {
            title: '经历分享'
        },
        component: (resolve) => require(['../views/Experience.vue'], resolve)
    },
    {
        path: '/OilForum',
        meta: {
            title: '油站论坛'
        },
        component: (resolve) => require(['../views/OilForum.vue'], resolve)
    },
    {
        path: '/ITTech',
        meta: {
            title: '技术沉淀'
        },
        component: (resolve) => require(['../views/ITTech.vue'], resolve)
    },
    {
        path: '/OilRobot',
        meta: {
            title: 'OilRobot'
        },
        component: (resolve) => require(['../views/OilRobot.vue'], resolve)
    },
    {
        path: '/Login',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['../views/Login.vue'], resolve)
    },
    {
        path: '/Register',
        meta: {
            title: '注册'
        },
        component: (resolve) => require(['../views/Register.vue'], resolve)
    },
    {
        path: '/Suggest',
        meta: {
            title: '反馈及建议'
        },
        component: (resolve) => require(['../views/Suggest.vue'], resolve)
    },
    {
        path: '/UserCenter',
        meta: {
            title: '用户中心'
        },
        component: (resolve) => require(['../views/UserCenter.vue'], resolve),
        children:[
            {path: '/MyDreams',meta:{title:'美好梦想'},component: (resolve) => require(['../views/usercenters/MyDreams.vue'], resolve)},
            {path: '/MyExperience',meta:{title:'经历分享'},component: (resolve) => require(['../views/usercenters/MyExperience.vue'], resolve)},
            {path: '/MyHots',meta:{title:'热门动弹'},component: (resolve) => require(['../views/usercenters/MyHots.vue'], resolve)},
            {path: '/MyITArticles',meta:{title:'技术文章'},component: (resolve) => require(['../views/usercenters/MyITArticles.vue'], resolve)},
            {path: '/MyLogs',meta:{title:'网站活动'},component: (resolve) => require(['../views/usercenters/MyLogs.vue'], resolve)},
            {path: '/MyQuestions',meta:{title:'问题疑惑'},component: (resolve) => require(['../views/usercenters/MyQuestions.vue'], resolve)},
            {path: '/UserCenterPage',meta:{title:'用户中心'},component: (resolve) => require(['../views/usercenters/UserCenterPage.vue'], resolve)}
        ]
    },
    {
        path: '/OilEditor',
        meta: {
            title: '油站编辑器'
        },
        component: (resolve) => require(['../views/components/OilEditor.vue'], resolve)
    },
    {
        path: '/Update',
        meta: {
            title: '更新日志'
        },
        component: (resolve) => require(['../views/components/Update.vue'], resolve)
    },
    {
        path: '/file-upload',
        meta: {
            title: 'file-upload'
        },
        component: (resolve) => require(['../views/manager/file-upload.vue'], resolve)
    }
];
export default routers;