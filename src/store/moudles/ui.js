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
        },
        /**
         * 删除成功
         * @param state
         * @param vm
         */
        deleteSuccess(state,vm){
            vm.$Notice.info({
                desc: '<h6>删除成功</h6>'
            });
        },
        /**
         * 删除失败
         * @param state
         * @param vm
         */
        deleteFailed(state,vm){
            vm.$Notice.error({
                desc: '<h6>系统故障,删除失败</h6>'
            });
        },
        /**
         * 文章已全部加载
         * @param state
         * @param vm
         */
        loadAll(state,vm){
            vm.$Notice.info({
                desc: '<h6>文章已全部加载</h6>'
            });
        },
        /**
         * 目标资源加载失败
         * @param state
         * @param vm
         */
        loadingFailed(state,vm){
            vm.$Notice.error({
                desc: '<h6>目标资源加载失败,请重试</h6>'
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
