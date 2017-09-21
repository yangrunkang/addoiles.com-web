<style scoped>
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
	}

/*	.layout-logo {
		width: 100px;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 15px;
		left: 20px;
	}
	*/
	.layout-nav {
		width: inherit;
		margin: 0 auto;
	}

	.layout-copy {
		text-align: center;
		padding: 10px 0 20px;
		color: #9ea7b4;
	}

	.router-style {
		color: white;
	}

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
		<Menu mode="horizontal" theme="dark" active-name="1">
			<!--<div class="layout-logo"></div>-->
			<div class="layout-nav">
                    <Menu-item name="1">
                        <Icon type="ios-navigate"></Icon>
                        <router-link to="/" class="router-style">主页</router-link>
                    </Menu-item>
                    <Menu-item name="2">
                        <Icon type="ios-keypad"></Icon>
                        <router-link to="/Dreams" class="router-style">梦想墙</router-link>
                    </Menu-item>
                    <Menu-item name="3">
                        <Icon type="ios-analytics"></Icon>
                        <router-link to="/Experience" class="router-style">经历分享</router-link>
                    </Menu-item>
                    <Menu-item name="4">
                        <Icon type="ios-analytics"></Icon>
                        <router-link to="/ITTech" class="router-style">技术沉淀</router-link>
                    </Menu-item>
                    <Menu-item name="5">
                        <Icon type="ios-analytics"></Icon>
                        <router-link to="/SoftwareTalk" class="router-style">软件评测</router-link>
                    </Menu-item>
  <!--                  <Menu-item name="6">
                        <Icon type="ios-analytics"></Icon>
                        <router-link to="/LiZhiFM" class="router-style">程序员的生活记录</router-link>
                    </Menu-item>-->
                    <Menu-item name="7">
                        <Icon type="person"></Icon>
                        <span @click="login">登录</span>
                    </Menu-item>

			</div>
		</Menu>
		<router-view></router-view>
		<!--这个是显示路由的视图结果-->
		<div class="layout-copy">
			2017-2017 &copy; www.addoiles.com
		</div>

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
                modal1: false
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
            }

        },
        mounted() {

            this.$Notice.config({
                top: 5,
                duration: 3
            });

            this.$Notice.success({
                title: '(｡･∀･)ﾉﾞ嗨！您好！',
                desc: '在这里，你可以尽情的展现你的内心世界！'
            });
        }
	}
</script>