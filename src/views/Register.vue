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

                <div class="log-logo">Welcome Addoiles!<br />Register</div>
            </div>
            <div class="log-email" v-show="registerForm">
                <input type="text" placeholder="用户名" :class="'log-input' + (userName==''?' log-input-empty':'')" v-model="userName">
                <input type="text" placeholder="邮箱" :class="'log-input' + (email==''?' log-input-empty':'')" v-model="email">
                <input type="password" placeholder="密码" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password">
                <input type="password" placeholder="重复密码" :class="'log-input' + (rePassword==''?' log-input-empty':'')"  v-model="rePassword">
                <a href="javascript:;" class="log-btn" @click="beginRegister()">第一步:注册</a>
            </div>
            <div class="log-email" v-show="verifyForm">
                <input type="password" placeholder="验证码已发到您的邮箱,,输入" :class="'log-input' + (rePassword==''?' log-input-empty':'')"  v-model="verificationCode">
                <a href="javascript:;" class="log-btn" @click="register()">第二步:完成注册</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                //用户名
                userName: '',
                //邮箱
                email: '',
                //密码
                password: '',
                //重新输入密码
                rePassword: '',
                //验证am
                verificationCode:'',
                //展示登录框
                registerForm:true,
                //展示验证框
                verifyForm:false
            }
        },
        methods:{
            //开始注册
            beginRegister(){
                this.registerForm = false;
                this.verifyForm=true;
            },
            //完成
            register(){
                let userName = this.userName;
                let email = this.email;
                let password = this.password;
                let rePassword = this.rePassword;

                let emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

                if(!this.addoileUtil.validateReq(userName)){
                    this.$Message.warning('用户名不能为空');
                    return;
                }

                if(userName.length > 16){
                    this.$Message.warning('用户名字数不能多于16个');
                    return;
                }

                if(!this.addoileUtil.validateReq(email) || !emailReg.test(email)){
                    this.$Message.warning('邮箱格式不正确,请检查');
                    return;
                }

                if(email.length > 32){
                    this.$Message.warning('邮箱字数不能多于32个');
                    return;
                }

                if(!this.addoileUtil.validateReq(password) || password.length < 6){
                    this.$Message.warning('密码长度不能少于6位');
                    return;
                }

                if(password.length > 32){
                    this.$Message.warning('密码字数不能多于32个');
                    return;
                }

                if(rePassword != password){
                    this.$Message.error('输入的两次密码不一致');
                    return;
                }

                this.axios.post("register",{
                    userName : userName,
                    email : email,
                    password : password
                }).then(function (resp) {

                    if(resp.data.code == 0 && resp.data.data == 1001){
                        this.$Message.warning(email+'已经注册过');
                        return;
                    }

                    if(resp.data.code == 0 && resp.data.data == true){
                        this.$Notice.success({
                            desc: '注册成功,2s后转到登录页'
                        });
                        setTimeout(function () {
                            this.$router.push('/Login');
                        }.bind(this), 2000);
                    }else{
                        this.$Notice.warning({
                            desc: '注册失败,请检查信息后重新注册'
                        });
                    }
                }.bind(this));


            }
        }
    }
</script>