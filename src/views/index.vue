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
		    </Menu>
        </div>

        <!--中间视图部分-->
        <router-view></router-view><!--这个是显示路由的视图结果-->

        <!--返回到顶部-->
        <Back-top :height="200" :bottom="50">
            <div class="top">返回顶端</div>
        </Back-top>

    </div>
</template>
<script>
    export default {
        data () {
            return {
                //是否显示登录框
                showLoginForm: false,
                //导航栏
                navList:[]
            }
        },
        methods: {
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
            }
        },
        mounted() {
            this.$Notice.config({
                top: 5,
                duration: 3
            });
            this.initNavList();
        }
	}
</script>