<style scoped lang="less">
    @import "../styles/common.css";

</style>
<template>
    <div class="main-content">
        <p style="text-align: center;margin-top: 6%">
            <Input v-model="content" type="textarea" :rows="7" size="large" placeholder="如果有,请写下你的建议或者问题反馈" style="width: 70%" />
            <Button type="info" size="large" long @click="suggest()" style="width: 70%;margin-top: 10px" >反馈</Button>
        </p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                content : ''
            }
        },
        methods: {
            suggest(){

                console.log(this.$store.getters.getUserId);
                if(!this.addoileUtil.validateReq(this.content) ){
                    this.$Message.warning("反馈内容为空",3);
                    return;
                }

                if(this.content.length > 3000){
                    this.$Message.warning("不要意思,建议或反馈内容限定在3000个字数以内,你可以拆分成多条建议或反馈",10);
                    return;
                }

                this.axios.post('suggest',{
                    userId:this.$store.getters.getUserId,
                    content:this.content
                }).then(function () {
                    this.$Notice.success({
                        desc: '<h4>反馈成功,非常感谢,后期会根据您填写的内容进行网站优化和功能点新增</h4>',
                        duration: 7
                    });
                    this.content='';
                }.bind(this));
            }
        },
        mounted() {
        }
    }
</script>