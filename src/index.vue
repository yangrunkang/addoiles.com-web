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
        width: fit-content;
        margin: 0 auto;
    }


</style>
<!--页面整体框架-->
<template>
	<div class="layout">

        <div class="layout-nav">
            <Menu mode="horizontal" theme="dark" @on-select="onSelect" class="menu">
                    <Menu-item :name="item.navRouter" v-for="item in navList" :key="item.id">
                            <Icon :type="item.navIcon"></Icon>
                            {{ item.navName }}
                    </Menu-item>
            </Menu>
        </div>

        <!--中间视图部分-->
        <div class="main-content">
            <router-view></router-view><!--这个是显示路由的视图结果-->
        </div>

        <div class="layout-bottom">
            <p>Copyright ©2017-2018 Addoiles.All Rights Reserved.为梦想加油 备案号:皖ICP备17015935号-1</p>
            <p>网站当前版本:v1.2(20171230)&nbsp;&nbsp;&nbsp;QQ交流群:595125384 &nbsp;&nbsp;&nbsp;电台:荔枝FM《程序员的生活记录》</p>
        </div>

        <!--返回到顶部-->
        <Back-top :height="200" :bottom="100">
            <div class="top">返回顶端</div>
        </Back-top>

        <!--反馈及建议图钉-->
        <Back-top :height="200" :bottom="50" @on-click="suggest">
            <div class="top">反馈及建议</div>
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
                this.axios.get('getNavs').then(function (res) {
                    if(res.data.code == 0){
                        let resp = res.data.data;
                        let _navList = [];
                        for(let i =0 ;i<resp.length ; i++){
                            _navList.push({navRouter : resp[i].navRouter , navIcon : resp[i].navIcon, navName : resp[i].navName});
                        }
                        //导航栏针对每个用户存储在store(到了仓库后,我把它放在session中了)
                        this.$store.commit('setNavList',_navList); //notice: is setNavList ,not to write navList!!
                        //从仓库中获取 notice: not getNavList()
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
                if(flag){//暂不退出
                    this.showLogOutModal = false;
                }else{//退出账号
                    sessionStorage.clear();
                    //退出浏览器自动清除
                    Cookies.remove('newUser');
                    Cookies.remove('userName');
                    Cookies.remove('email');
                    //刷新用户正在看的页面
                    //会调用index.vue  mounted() 方法,因为已经sessionStorage.clear(),所以会当成新用户
                    this.$router.go(0);
                }
            },
            suggest(){
                this.$router.push('/Suggest');
            }
        },
        mounted() {
            this.$Notice.config({
                top: 5,
                duration: 3
            });
            if(Cookies.get("newUser")){
                //这个用户不再初始化导航栏,一直用他第一次进来是初始化好的导航栏
                //声明周期一直到用户关闭浏览器
                this.navList = this.$store.getters.getNavList;
            }else{
                //用户第一次打开浏览器进来,标记newUser
                Cookies.set("newUser","1");
                //初始化导航栏
                this.initNavList();
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