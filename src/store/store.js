//引入vue模块
import Vue from 'vue';
//集中式管理
import Vuex from 'vuex';
import business from "./moudles/business";
import constant from "./moudles/constant";
import ui from "./moudles/ui";

Vue.use(Vuex);

/*需要写以上内容,否则会出现Vuex is not defined的错误[核心,组件化概念]*/
export default new Vuex.Store({
    state: {},
    mutations: {},
    getters: {},
    modules: {
        business,
        constant,
        ui
    }
});
