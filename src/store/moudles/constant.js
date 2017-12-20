//引入vue模块
import Vue from 'vue';
//集中式管理
import Vuex from 'vuex';
Vue.use(Vuex);
import Cookies from 'js-cookie';
const constant = {
    state: {
        /*邮箱正则表达式*/
        emailReg: ''
    },
    getters: {
        getEmailReg: state => {
            return /^[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)*@[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)+$/i;
        }
    },
};

export default constant;
