<style scoped lang="less" xmlns:javascript="http://www.w3.org/1999/xhtml"
       xmlns:javascript="http://www.w3.org/1999/xhtml">
    @import "../styles/common.css";

    .login{overflow: hidden;left: 50%; top:50%; margin: 0 auto; width: 500px; min-height: 555px; z-index: 10; right: 140px; background: #fff;-webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px; -webkit-box-shadow:  0px 3px 16px -5px #070707; box-shadow:  0px 3px 16px -5px #070707}
    .log-close{display: none; }
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

    .a-tips {
        color: #9ea7b4;
    }

</style>
<template>
    <div>
        <div class="login" id="login">
            <a href="javascript:;" class="log-close"><i class="icons close"></i></a>
            <div class="log-bg">
                <div class="log-cloud cloud1"></div>
                <div class="log-cloud cloud2"></div>
                <div class="log-cloud cloud3"></div>
                <div class="log-cloud cloud4"></div>

                <div class="log-logo">Welcome Addoiles!<br />Login</div>
            </div>
            <div class="log-email" v-show="showLoginForm">
                <input type="text" placeholder="输入邮箱登录" :class="'log-input' + (email==''?' log-input-empty':'')" v-model="email">
                <input type="password" placeholder="输入密码" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password">
                <a href="javascript:;" class="log-btn" @click="toLogin">登录</a>
            </div>
            <p style="text-align: center;margin-bottom: 10px" v-show="showLoginForm">
                <a class="a-tips" @click="forgetPassword()">忘记密码</a> &nbsp;&nbsp;
                <a class="a-tips" @click="receiveEmailFailed()">未收到邮件反馈</a>
            </p>

            <div class="log-email" v-show="showForgetPasswordForm">
                <input type="text" placeholder="请输入验证码" :class="'log-input' + (verificationCode==''?' log-input-empty':'')"  v-model="verificationCode">
                <a href="javascript:;" class="log-btn" @click="verifyCode()">验证</a>
            </div>
            <div class="log-email" v-show="resetPassword">
                <p style="text-align: center;margin-bottom: 10px;font-size: 18px">验证成功,重设密码</p>
                <input type="password" placeholder="输入密码" :class="'log-input' + (resetPassword1==''?' log-input-empty':'')"  v-model="resetPassword1">
                <input type="password" placeholder="再次输入密码" :class="'log-input' + (resetPassword2==''?' log-input-empty':'')"  v-model="resetPassword2">
                <a href="javascript:;" class="log-btn" @click="confirmResetPassword()">确认</a>
            </div>
        </div>

        <!--发送验证码时提高用户体验-->
        <Modal v-model="showSendVerifyCodeModal"
               :mask-closable="!showSendVerifyCodeModal"
               :closable="!showSendVerifyCodeModal">
            <p slot="header" style="color:#f60;text-align:left">
                请稍等...木有钱买邮件服务,呜呜
            </p>
            <div style="text-align:center">
                <Row>
                    <i-col span="24">
                        <h3>程序正在努力发邮件中...请稍等</h3>
                        <Spin size="large" style="width: 10%;margin: 0 auto;"></Spin>
                    </i-col>
                </Row>
            </div>
            <div slot="footer">
            </div>

        </Modal>


    </div>
</template>
<script>

    export default {
        data(){
            return {
                //邮箱
                email: '',
                //密码
                password: '',
                //验证码
                verificationCode:'',
                //展示登录框
                showLoginForm:true,
                //展示忘记密码框
                showForgetPasswordForm:false,
                //展示重设密码框
                resetPassword:false,
                //重设密码1
                resetPassword1:'',
                //重设密码2
                resetPassword2:'',
                //发送验证时展示
                showSendVerifyCodeModal:false,
            }
        },
        methods:{
            //登录
            toLogin(){
                let email = this.email;
                let password = this.password;

                let emailReg = this.$store.getters.getEmailReg;
                if(!this.addoileUtil.validateReq(email) || !emailReg.test(email)){
                    this.$Message.warning('邮箱格式不正确,请检查');
                    return;
                }

                if(!this.addoileUtil.validateReq(password) || password.length < 6){
                    this.$Message.warning('密码长度不能少于6位');
                    return;
                }

                this.$Notice.info({
                    desc: '正在登录请稍等',
                    duration : 3
                });

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
                        this.$store.commit('setEmail',email);

                        //获取导航栏后,操作如下: 1.去除注册 2.修改登录为注销
                        //页面跳转
                        setTimeout(function () {
                            this.$router.push('/');
                        }.bind(this), 2000);
                        //改变到那个导航栏

                        //获取导航栏后,操作如下: 1.去除注册 2.修改登录为注销
                        let navList = this.$store.getters.getNavList;
                        let _count = 0; //计数,到2就跳出循环,以防程序多跑
                        for(let i = 0; i < navList.length; i++){
                            let perNav = navList[i];
                            //移除注册/登录导航按钮
                            if(perNav.navName === '注册' || perNav.navName === '登录'){
                                navList.splice(i,i+1); //i:当前元素index,第二个参数是当前坐标i后的几个元素删除
                                _count++;
                            }
                            if(_count == 1){//在index.vue onSelect控制,操作仓库  debug result is 1
                                //显示当前用户
                                navList.push({
                                    navRouter : 'BestWishesToUser',
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

            },
            forgetPassword(){

                let emailReg = this.$store.getters.getEmailReg;
                if(!this.addoileUtil.validateReq(this.email) || !emailReg.test(this.email)){
                    this.$Message.warning('邮箱格式不正确,请检查');
                    return;
                }

                //确认是否是网站用户
                this.axios.get("checkHasRegister",{
                    params:{email:this.email}
                }).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data < 1){
                        this.$Notice.warning({
                            desc: 'Hi,您未在网站注册过(又想骗我)'
                        });
                    }else{
                        //发送验证码
                        let _this = this;
                        let config = {
                            content:'即将发送验证码到您输入的邮箱,请注意查收',
                            okText:'确认',
                            onOk(){
                                _this.showSendVerifyCodeModal = true;
                                //发送验证码
                                _this.axios.post("sendVerificationCode",{
                                    email : _this.email,
                                    type : 1
                                }).then(function (resp) {
                                    if(resp.data.code == 0 && resp.data.data == true){
                                        _this.showForgetPasswordForm = true;
                                        _this.showLoginForm=false;
                                        _this.resetPassword = false;
                                        _this.showSendVerifyCodeModal = false;
                                    }else{
                                        this.$Notice.warning({
                                            desc: '验证码发送失败'
                                        });
                                    }
                                }.bind(_this));
                            }
                        };
                        this.$Modal.confirm(config);


                    }
                }.bind(this));

            },
            //验证验证码
            verifyCode(){
                this.axios.post("verifyCode",{
                    email : this.email,
                    code : this.verificationCode
                }).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data == true){
                        this.resetPassword = true;
                        this.showLoginForm = false;
                        this.showForgetPasswordForm = false;
                    }else{
                        this.$Notice.warning({
                            desc: '验证码已失效'
                        });
                    }
                }.bind(this));
            },
            //重设密码
            confirmResetPassword(){
                let resetPassword1 = this.resetPassword1;
                let resetPassword2 = this.resetPassword2;

                if(!this.addoileUtil.validateReq(resetPassword1) || resetPassword1.length < 6
                ||!this.addoileUtil.validateReq(resetPassword2) || resetPassword2.length < 6){
                    this.$Message.warning('密码长度不能少于6位');
                    return;
                }

                if(resetPassword1.length > 32 || resetPassword2.length > 32){
                    this.$Message.warning('密码字数不能多于32个');
                    return;
                }

                if(resetPassword2 != resetPassword1){
                    this.$Message.error('输入的两次密码不一致');
                    return;
                }

                this.axios.post("confirmResetPassword",{
                    email : this.email,
                    password : this.resetPassword1
                }).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data  > 0){
                        this.$Notice.success({
                            desc: '密码重设成功,请登录'
                        });
                        this.showLoginForm = true;
                        this.showForgetPasswordForm = false;
                        this.resetPassword = false;
                        this.password = '';
                        this.resetPassword1 = '';
                        this.resetPassword2 = '';
                    }else{
                        this.$Notice.warning({
                            desc: '重设密码失败'
                        });
                    }
                }.bind(this));
            },
            receiveEmailFailed(){
                this.$store.commit('toSuggest',this);
            }
        }
    }
</script>