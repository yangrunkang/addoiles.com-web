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
		width: 420px;
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
                    <Menu-item name="2" style="padding-right: 20px">
                        <Icon type="person"></Icon>
                        登录
                    </Menu-item>

			</div>
		</Menu>
		<router-view></router-view>
		<!--这个是显示路由的视图结果-->
		<div class="layout-copy">
			2017-2017 &copy; Belongs to YangRunkang
		</div>

        <!--返回到顶部-->
        <Back-top :height="200" :bottom="50">
            <div class="top">返回顶端</div>
        </Back-top>
	</div>
</template>
<script>




	export default {
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