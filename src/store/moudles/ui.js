//引入vue模块
import Vue from 'vue';
//集中式管理
import Vuex from 'vuex';
Vue.use(Vuex);
import Cookies from 'js-cookie';
const ui = {
    state: {

    },
    mutations: {
        testShowMessage(state,vm){
            vm.$Notice.success({
                desc: '登录成功,2s后转到首页'
            });
        }
    },
    getters: {

    },
};

export default ui;
