<style scoped>

    @import "styles/common.css";

    /*返回顶端css*/
    .top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }

    .menu{
        display:table;
        margin-left:auto;
        margin-right:auto;
    }


</style>
<!--页面整体框架-->
<template>
	<div class="layout">

        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" @on-select="onSelect" class="menu">
                    <Menu-item :name="item.navRouter" v-for="item in navList" :key="item.id" >
                        <Icon :type="item.navIcon"></Icon>
                        {{ item.navName }}
                    </Menu-item>
                </Menu>
            </Header>
            <Content>
                <!--中间视图部分-->
                <div class="main-content">
                    <router-view></router-view><!--这个是显示路由的视图结果-->
                </div>
            </Content>
            <Footer>
                <div class="layout-bottom">
                    <p>Copyright ©2017-2019 Addoiles.All Rights Reserved.为梦想加油 备案号:皖ICP备17015935号-1</p>
                    <p>
                        <a style="color: #9ea7b4;" @click="toUpdate()">网站当前版本:v1.5.5&nbsp;(2019.06.15)</a>&nbsp;&nbsp;&nbsp;
                        <a style="color: #9ea7b4;" @click="toWangYiDianTai()">网易云音乐电台《程序员的生活记录》</a>
                    </p>
                </div>
            </Footer>
        </Layout>

        <!--返回到顶部-->
        <Back-top :height="100" :bottom="150">
            <div class="top">&nbsp;返回顶端&nbsp;</div>
        </Back-top>

        <!--支持一下-->
        <Back-top :height="100" :bottom="100" @on-click="support">
            <div class="top">&nbsp;支持一下&nbsp;</div>
        </Back-top>

        <!--反馈及建议图钉-->
        <Back-top :height="100" :bottom="50" @on-click="suggest">
            <div class="top">反馈+建议</div>
        </Back-top>

        <!--确认注销模态框-->
        <Modal v-model="showLogOutModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>要准备退出油油账号了吗</span>
            </p>
            <div style="text-align:center">
                <p>退出的话,记得下次再来光顾哦^^</p>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long  @click="logOutCurrent(true)">我再逛会儿</Button>
            </div>
            <div slot="footer" style="margin-top: 4px;">
                <Button type="warning" size="large" long  @click="logOutCurrent(false)">退出油号</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import Cookies from 'js-cookie';

    export default {
        data () {
            return {
                //是否显示登录框
                showLoginForm: false,
                //导航栏
                navList:[],
                //是否展示注销模态框
                showLogOutModal: false
            }
        },
        methods: {
            //初始化导航栏
            initNavList(){
                this.axios.get('navList').then(function (res) {
                    if(res.code == 0){
                        let navListJson = res.data;
                        this.$store.commit('setNavList',navListJson);
                        this.navList = this.$store.getters.getNavList;
                    }
                }.bind(this));
            },
            //导航栏栏目选择
            onSelect(activeRouterUrl){
                if(activeRouterUrl === 'logOutCurrent'){ //点击注销,
                    this.showLogOutModal = true;
                }else if('BestWishesToUser' === activeRouterUrl){
                    // this.$router.push("/UserCenter"); //下面的父 就是UserCenter
                    this.$router.push("/UserCenterPage");
                }else{
                    this.$router.push(activeRouterUrl);
                }
            },
            logOutCurrent(flag){
                if(!flag){//退出账号
                    sessionStorage.clear();
                    //退出浏览器自动清除
                    Cookies.remove('newUser',{ path: '' });
                    Cookies.remove('email',{ path: '' });
                    location.reload();
                }
                //无论点击模态框哪个按钮,这个模态框都得关闭
                this.showLogOutModal = false;
            },
            suggest(){
                this.$store.commit('toSuggest',this);
            },
            toUpdate(){
                this.$router.push('/Update')
            },
            support(){
                this.$router.push('/support')
            },
            toWangYiDianTai(){
                this.$router.push('/fm')
            }
        },
        mounted() {
            if(Cookies.get("newUser")){ //被标记用户
                this.navList = this.$store.getters.getNavList;
            }else{ //未被标记用户
                //用户第一次打开浏览器进来,标记newUser
                Cookies.set("newUser","1");
                //初始化导航栏
                this.initNavList();
                //初始化完成后跳转到首页
                this.$router.push('/');
                //欢迎
                setTimeout(function () {
                    this.$Notice.success({
                        title: '(｡･∀･)ﾉﾞ嗨! 您好!',
                        desc: '欢迎来到油站',
                        duration:4
                    });
                }.bind(this),3000);
            }
        }
	}
</script>