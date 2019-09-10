<style scoped lang="less">
    @import "../styles/common.css";

</style>
<template>
    <div>
        <p style="text-align: center;margin-top: 6%">
            <Input v-model="content" type="textarea" :rows="7" size="large" placeholder="如果有,请写下你的建议或者问题反馈" style="width: 69%" />
            <Button type="info" size="large" long @click="suggest()" style="width: 69%;margin-top: 10px" >反馈</Button>
        </p>
        <br/>
        <p style="width: 69%;margin: 0 auto" @click="$store.commit('toJianLi',window)"><Card :bordered="false" >个人简历</Card></p>
        <br/>
        <Card style="width: 69%;margin: 0 auto">
            <p slot="title" style="font-size:17px; font-weight: bolder; color: #716769">电台《程序员的生活记录》  目前在网易云音乐/网易云电台,荔枝FM,喜马拉雅,苹果播客可获得收听</p>
            <p class="wy">
                <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=450
                        src="//music.163.com/outchain/player?type=4&id=341445058&auto=1&height=430"></iframe></p>
            <p style="text-align: center">
                <a style="font-weight: bolder; color: #716769;"
                   href="http://music.163.com/djradio?id=341445058"
                   target="_blank">去网易云音乐电台直接收听《程序员的生活记录》</a>
            </p>
            <br />
            <p style="text-align: right"><a style="color: #9ea7b4;" target="_blank" href="https://t.me/coderLifeLog">《程序员的生活记录》电报(Telegram)讨论组</a></p>
            <br />
        </Card>
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

                if(!this.addoileUtil.validateReq(this.content) ){
                    this.$Message.warning("反馈内容为空",3);
                    return;
                }

                if(this.content.length > 3000){
                    this.$Message.warning("不要意思,建议或反馈内容限定在3000个字数以内,你可以拆分成多条建议或反馈",10);
                    return;
                }

                this.axios.post('addSuggest',{
                    userId:this.$store.getters.getUserId,
                    tokenId: sessionStorage.getItem("tokenId"),
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