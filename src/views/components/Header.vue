<style scoped lang="less">
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <Menu-item name="1">
                    <Icon type="ios-navigate"></Icon>
                    主页
                </Menu-item>
                <Menu-item name="2">
                    <Icon type="ios-keypad"></Icon>
                    论坛
                </Menu-item>
                <Menu-item name="3">
                    <Icon type="ios-analytics"></Icon>
                    梦想墙
                </Menu-item>
                <Menu-item name="4">
                    <Icon type="ios-paper"></Icon>
                    经历分享
                </Menu-item>
            </div>
        </Menu>
    </div>
</template>
<script>
//    import Home from '../Home.vue';
//    import Forum from '../Fourm.vue';
//    import Dreams from '../Dreams.vue';
//    import Experience from '../Experience.vue';

</script>