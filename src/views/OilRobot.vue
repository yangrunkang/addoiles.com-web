<style scoped lang="less">
    @import "../styles/common.css";

    .history-chat {
        margin: 45px auto;
        width: 70%;
    }

    .time{
        font-size: 14px;
        font-weight: bold;
    }

    .content{
        padding-left: 5px;
        font-size: 27px;
    }




</style>
<template>
    <div>
        <h1 style="text-align: center">Hi,我是OilRobot聊天机器人</h1>
        <h2 style="text-align: center">快来同我一起聊会儿天吧</h2>
        <p style="text-align: center;height: auto"><Icon type="social-reddit-outline" size="200" color="#657180" ></Icon></p>
        <p style="text-align: center">
            <Input v-model="chatContent" size="large" placeholder="Hi,和我聊天吧" style="width: 70%" @on-enter="toChat" />
        </p>
        <div class="history-chat">
            <Timeline>
                <Timeline-item v-for="chat in historyChatList" key="chat.id">
                    <p class="time"><span style="color: slategrey;" class="auto-break-line">From:</span>&nbsp;&nbsp;&nbsp;{{chat.userName}}</p>
                    <p class="content auto-break-line">{{chat.chatContent}}</p>
                </Timeline-item>
            </Timeline>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                //聊天内容
                chatContent :'',
                //聊天内容
                historyChatList : []
            }
        },
        methods: {
            toChat(){

                let userId = this.$store.getters.getUserId;
                let userName = this.$store.getters.getUserName;

                if(userName == 'null' || userId == 'null'){
                    userId = "www.addoiles.com"; //不是网站用户,是访客
                    userName = "我";
                }

                //用户输入的聊天内容,更新到页面
                this.historyChatList.unshift({
                    userId:userId,
                    userName:userName,
                    chatContent:this.chatContent
                });
                //接口请求
                this.axios.post("chat",{
                    key:this.tulingKey,
                    info:this.chatContent,
                    api:this.tulingAPI,
                    userid:userId
                }).then(function (resp) {
                    //这里的OilRobot不变 - From Server
                    this.historyChatList.unshift({userId:"OilRobot",userName:"OilRobot",chatContent:resp.data.data});
                }.bind(this));

                //清空聊天框
                this.chatContent = '';
            }
        },
        mounted () {

        }
    }
</script>