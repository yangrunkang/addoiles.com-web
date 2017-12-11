<style scoped lang="less">
    @import "../styles/common.css";

</style>
<template>
    <div>
        <Row :gutter="16">
            <i-col span="6" style="background-color: #00c261">
                <div>col-6</div>
            </i-col>
            <i-col span="18"  style="background-color:burlywood">
                <div>col-6</div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import ICol from "iview/src/components/grid/col";
    export default {
        data () {
            return {

            }
        },
        methods: {

        },
        computed: {

        },
        mounted () {

        }
    }
</script>