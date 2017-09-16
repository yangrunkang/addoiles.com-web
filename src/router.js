const routers = [
    {
        path: '/',
        meta: {
            title: 'index'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/demo',
        meta: {
            title: 'demo'
        },
        component: (resolve) => require(['./components-demo/demo.vue'], resolve)
    }
];
export default routers;