<style scoped lang="less">
    @import "../styles/common.css";
</style>
<template>
    <div class="main-content">
        <Row :gutter="16">
            <Col span="6">
                <Menu theme="light" :active-name="this.$route.path" @on-select="menuSelect">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-paper"></Icon>
                            内容管理
                        </template>
                        <Menu-item name="/SoftwareTalk">文章管理</Menu-item>
                        <Menu-item name="1-2">评论管理</Menu-item>
                        <Menu-item name="1-3">举报管理</Menu-item>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-people"></Icon>
                            用户管理
                        </template>
                        <Menu-item name="2-1">新增用户</Menu-item>
                        <Menu-item name="2-2">活跃用户</Menu-item>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="stats-bars"></Icon>
                            统计分析
                        </template>
                        <Menu-group title="使用">
                            <Menu-item name="3-1">新增和启动</Menu-item>
                            <Menu-item name="3-2">活跃分析</Menu-item>
                            <Menu-item name="3-3">时段分析</Menu-item>
                        </Menu-group>
                        <Menu-group title="留存">
                            <Menu-item name="3-4">用户留存</Menu-item>
                            <Menu-item name="3-5">流失用户</Menu-item>
                        </Menu-group>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="18">
                <router-view></router-view>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        methods: {
            menuSelect(name){
                console.log("Menu Selected:" + name);
                this.$router.push({ path: name });
//                this.$router.options.
            }
        },
        mounted () {

        }
    }
</script>