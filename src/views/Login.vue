<style scoped lang="less">
    @import "../styles/common.css";

    .login{overflow: hidden;left: 50%; top:50%; margin: 0 auto; width: 500px; min-height: 555px; z-index: 10; right: 140px; background: #fff;-webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px; -webkit-box-shadow:  0px 3px 16px -5px #070707; box-shadow:  0px 3px 16px -5px #070707}
    .log-close{display: block; position: absolute; top:12px; right: 12px; opacity: 1;}
    .log-close:hover .icons{transform: rotate(180deg);}
    .log-close .icons{opacity: 1; transition: all .3s}
    .log-cloud{background-image: url(../images/login-cloud.png); width: 63px ;height: 40px; position: absolute; z-index: 1}
    .login .cloud1{top:21px; left: -30px; transform: scale(.6); animation: cloud1 20s linear infinite;}
    .login .cloud2{top:87px; right: 20px; animation: cloud2 19s linear infinite;}
    .login .cloud3{top:160px; left: 5px;transform: scale(.8);animation: cloud3 21s linear infinite;}
    .login .cloud4{top:150px; left: -40px;transform: scale(.4);animation: cloud4 19s linear infinite;}
    .log-bg{background: url(../images/login-bg.jpg); width: 100%; height: 312px; overflow: hidden;}
    .log-logo{height: 80px; margin: 120px auto 25px; text-align: center; color: #1fcab3; font-weight: bold; font-size: 40px;}
    .log-text{color: #57d4c3; font-size: 13px; text-align: center; margin: 0 auto;}
    .log-logo,.log-text{z-index: 2}
    .icons{background:url(../images/icons.png) no-repeat; display: inline-block;}
    .close{height:16px;width:16px;background-position:-13px 0;}
    .login-email{height:17px;width:29px;background-position:-117px 0;}
    .log-btns{padding: 15px 0; margin: 0 auto;}
    .log-btn{width:402px; display: block; text-align: left; line-height: 50px;margin:0 auto 15px; height:50px; color:#fff; font-size:13px;-webkit-border-radius: 5px; background-color: #3B5999;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px;
        position: relative;}
    .log-btn.tw{background-color: #13B4E9}
    .log-btn.email{background-color: #50E3CE}
    .log-btn:hover,.log-btn:focus{color: #fff; opacity: .8;}
    .log-email{text-align: center; margin-top: 20px;}
    .log-email .log-btn{background-color: #50E3CE;text-align: center;}
    .log-input-empty{border: 1px solid #f37474 !important;}
    .log-btn .icons{margin-left: 30px; vertical-align: middle;}
    .log-btn .text{left: 95px; line-height: 50px; text-align: left; position: absolute;}
    .log-input{width: 370px;overflow: hidden; padding: 0 15px;font-size: 13px; border: 1px solid #EBEBEB; margin:0 auto 15px; height: 48px; line-height: 48px; -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px;}
    .log-input.warn{border: 1px solid #f88787}
    @-webkit-keyframes cloud1 {
        0%{left: 200px}
        100%{left:-130px;}
    }
    @keyframes cloud1{
        0%{left: 200px}
        100%{left:-130px;}
    }
    @-webkit-keyframes cloud2 {
        0%{left:500px;}
        100%{left:-90px;}
    }
    @keyframes cloud2{
        0%{left:500px;}
        100%{left:-90px;}
    }
    @-webkit-keyframes cloud3 {
        0%{left:620px;}
        100%{left:-70px;}
    }
    @keyframes cloud3{
        0%{left:620px;}
        100%{left:-70px;}
    }@-webkit-keyframes cloud4 {
         0%{left:100px;}
         100%{left:-70px;}
     }
    @keyframes cloud4{
        0%{left:100px;}
        100%{left:-70px;}
    }
</style>
<template>
    <div class="main-content">
        <div class="login" id="login">
            <a href="javascript:;" class="log-close"><i class="icons close"></i></a>
            <div class="log-bg">
                <div class="log-cloud cloud1"></div>
                <div class="log-cloud cloud2"></div>
                <div class="log-cloud cloud3"></div>
                <div class="log-cloud cloud4"></div>

                <div class="log-logo">Welcome Addoiles!<br />Login</div>
            </div>
            <div class="log-email">
                <input type="text" placeholder="输入邮箱登录" :class="'log-input' + (email==''?' log-input-empty':'')" v-model="email">
                <input type="password" placeholder="输入密码" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password">
                <a href="javascript:;" class="log-btn" @click="toLogin">登录</a>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        data(){
            return {
                email: '',
                password: ''
            }
        },
        methods:{
            //登录
            toLogin(){
                var email = this.email;
                var password = this.password;

                var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                if(!this.addoileUtil.validateReq(email) || !emailReg.test(email)){
                    this.$Message.warning('邮箱格式不正确,请检查');
                    return;
                }

                if(!this.addoileUtil.validateReq(password) || password.length < 6){
                    this.$Message.warning('密码长度不能少于6位');
                    return;
                }

                this.axios.post("login",{
                    email : email,
                    password : password
                }).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data.userId != null){
                        this.$Notice.success({
                            desc: '登录成功,2s后转到首页'
                        });
                        //提交到仓库
                        this.$store.commit('setUserName',resp.data.data.userName);
                        this.$store.commit('setUserId',resp.data.data.userId);
                        //获取导航栏后,操作如下: 1.去除注册 2.修改登录为注销
                        //页面跳转
                        setTimeout(function () {
                            this.$router.push('/');
                        }.bind(this), 2000);
                        //改变到那个导航栏

                        //获取导航栏后,操作如下: 1.去除注册 2.修改登录为注销
                        var navList = this.$store.getters.getNavList;
                        var _count = 0; //计数,到2就跳出循环,以防程序多跑
                        for(var i = 0; i < navList.length; i++){
                            var perNav = navList[i];
                            //移除注册/登录导航按钮
                            if(perNav.navName === '注册' || perNav.navName === '登录'){
                                navList.splice(i,i+1); //i:当前元素index,第二个参数是当前坐标i后的几个元素删除
                                _count++;
                            }
                            if(_count == 1){//在index.vue onSelect控制,操作仓库  debug result is 1
                                //显示当前用户
                                navList.push({
                                    navRouter : resp.data.data.userId,
                                    navIcon : 'person',
                                    navName : resp.data.data.userName
                                });
                                //显示退出按钮
                                navList.push({
                                    navRouter :'logOutCurrent',
                                    navIcon : 'power',
                                    navName : '退出'
                                });
                                break;
                            }
                        }
                        this.$store.commit('setNavList',navList);

                    }else{
                        this.$Notice.warning({
                            desc: '登录失败,请检查信息后重新登录'
                        });
                    }
                }.bind(this));

            }
        }
    }
</script>