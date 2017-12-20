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
        /**
         * 验证登录
         * @param state
         * @param vm
         */
        validateLogin(state,vm){
            let userId = sessionStorage.getItem("userId");
            if(!vm.addoileUtil.validateReq(userId)){
                vm.$Notice.info({
                    desc: '<h6>Hi,您还未登录,请登录</h6>'
                });
                return;
            }
            return userId;
        }
    },
    getters: {

    },
};

export default ui;
