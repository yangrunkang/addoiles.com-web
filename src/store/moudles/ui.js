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
                    title:'您还未登录,请登录',
                    desc:'登录提示'
                });
                setTimeout(function () {
                    vm.$router.push('/Login');
                }.bind(this),600);
                return;
            }
            return userId;
        },
        /**
         * 删除成功
         * @param state
         * @param vm
         */
        deleteSuccess(state,vm){
            vm.$Notice.info({
                title: '删除成功',
                desc:'操作提示'
            });
        },
        /**
         * 删除失败
         * @param state
         * @param vm
         */
        deleteFailed(state,vm){
            vm.$Notice.error({
                title: '系统故障,删除失败',
                desc:'出错啦'
            });
        },
        /**
         * 目标资源加载失败
         * @param state
         * @param vm
         */
        loadingFailed(state,vm){
            vm.$Notice.error({
                title: '目标资源ID不存在,请重试',
                desc: '出错啦'
            });
        },
        /**
         * 去建议
         * @param state
         * @param vm
         */
        toSuggest(state,vm){
            vm.$router.push('/Suggest');
        }

    },
    getters: {

    },
};

export default ui;
