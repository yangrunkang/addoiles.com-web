<style scoped>

    @import "../styles/common.css";

    /*返回顶端css*/
    .top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }

</style>
<!--页面整体框架-->
<template>
	<div class="layout">
        <!--导航栏部分-->
        <div class="layout-nav">
		    <Menu mode="horizontal" theme="dark" @on-select="onSelect" >
                <Menu-item :name="item.navRouter" v-for="item in navList" key="item.id">
                        <Icon :type="item.navIcon"></Icon>
                        {{ item.navName }}
                </Menu-item>
                <Menu-item name="7">
                    <span @click="login">
                        <Icon type="person"></Icon>
                        登录
                    </span>
                </Menu-item>
		    </Menu>
        </div>

        <!--中间视图部分-->
		<router-view></router-view><!--这个是显示路由的视图结果-->

        <!--页面底部 底部可以去掉,背景色 和body颜色一样-->
<!--		<div class="layout-bottom">
			2017-2017 &copy; www.addoiles.com
		</div>-->

        <!--返回到顶部-->
        <Back-top :height="200" :bottom="50">
            <div class="top">返回顶端</div>
        </Back-top>


        <!--登录模态框-->
        <Modal
                v-model="modal1"
                title="登录"
                @on-cancel="cancel"
                @on-ok="loginBtn('formInline')"
                ok-text="登录">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
               <Form-item prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
            </Form>
        </Modal>

    </div>


</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ]
                },
                modal1: false,
                navList:[]
            }
        },
        methods: {
            loginBtn(name) {
                this.$refs[name].validate((valid)=>{
                    if (valid) {
                        this.$Message.success('提交成功!');
                    }else{
                        this.$Message.error('表单验证失败!');
                    }
                });
            },
            cancel () {
                this.modal1 = false;
            },

            login(){
                this.modal1 = true;
            },
            //初始化导航栏
            initNavList(){
                this.axios.get('getNavs').then(function (res) {
                    if(res.data.code == 0){
                        var resp = res.data.data;
                        for(var i =0 ;i<resp.length ; i++){
                            this.navList.push({navRouter : resp[i].navRouter , navIcon : resp[i].navIcon, navName : resp[i].navName});
                        }
                    }
                }.bind(this));
            },
            //导航栏栏目选择
            onSelect(activeName){
                this.$router.push(activeName);
            },
        },
        mounted() {
            this.$Notice.config({
                top: 5,
                duration: 3
            });
            this.initNavList();
//                this.$Notice.success({
//                    title: '(｡･∀･)ﾉﾞ嗨！您好！',
//                    desc: '在这里，你可以尽情的展现你的内心世界！'
//                });
        }

	}
</script>