<style scoped lang="less">
    @import "../styles/common.css";
</style>
<template>
    <div class="index">
        <app-header></app-header>
        <app-home></app-home>
        <app-footer></app-footer>
    </div>
</template>
<script>
    /*只组织页面*/
	import Header from '../views/components/Header.vue';
	import Home from './Home.vue';
    import Footer from '../views/components/Footer.vue';

    export default {
        components: {
            'app-header': Header,
            'app-home': Home, //默认第一个显示
            'app-footer': Footer,
        }
    }
</script>
