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
    <div class="main-content">
        <h1 style="text-align: center">欢迎OilRobot聊天机器人</h1>
        <p style="text-align: center;height: auto"><Icon type="social-reddit-outline" size="200" color="#657180" ></Icon></p>
        <p style="text-align: center">
            <Input v-model="chatContent" size="large" placeholder="Hi,和我聊天吧" style="width: 70%" @on-enter="toChat" />
        </p>
        <div class="history-chat">
            <Timeline>
                <Timeline-item v-for="chat in historyChatList" key="chat.id">
                    <p class="time"><span style="color: slategrey">From:</span>&nbsp;&nbsp;&nbsp;{{chat.userName}}</p>
                    <p class="content">{{chat.chatContent}}</p>
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
                this.historyChatList.unshift({
                    userId:sessionStorage.getItem("userId"),
                    userName:sessionStorage.getItem("userName"),
                    chatContent:this.chatContent
                })
                var userId = "current_user";

                //
                this.axios.post("chat",{
                    key:this.tulingKey,
                    info:this.chatContent,
                    api:this.tulingAPI,
                    userid:this.userId
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