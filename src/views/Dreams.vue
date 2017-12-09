<style scoped lang="less">
    @import "../styles/common.css";

    .demo-affix {
        display: inline-block;
        color: #fff;
        padding: 10px 30px;
        text-align: center;
        background: white;
        border-radius: 30px;
    }

    li {
        float: left;
        width: 33%;
        margin: 1px;
    }

    .dream-card {
        background: transparent;
        border-radius: 30px;
        margin-bottom: 6px;
        margin-left: 6px
    }

</style>
<template>
    <div>

        <Affix :offset-bottom="10" style="background-color: transparent">
            <span class="demo-affix" v-show="isShowAffix" style="background-color: transparent">
                <Input placeholder="写下你的梦想" v-model="dreamTitle">
                    <Button slot="append" @click="toDreamWall">许下</Button>
                </Input>
                <Input style="padding-top: 5px;"  type="textarea" :rows="3" placeholder="例如:我的梦想是实现自己的价值,做自己喜欢做的事情" v-model="dreamContent"/>
            </span>
        </Affix>

        <div>
            <ul>
                <li v-for="item in dreamList" key="item.id">
                    <Card class="dream-card">
                        <div style="margin: inherit">
                            <Alert :type="item.alertType" style="height: inherit">
                                <strong class="auto-break-line">{{item.dreamTitle}}</strong>
                                <span slot="desc" class="auto-break-line" >{{item.dreamContent}}</span>
                            </Alert>
<!--                            <div>
                                <Button type="info" shape="circle">为Ta加油</Button>
                                <Button type="success" shape="circle">同理想</Button>
                            </div>-->
                        </div>
                    </Card>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isShowAffix : false, //一开始不显示,5秒后显示
                dreamTitle : null, //梦想标题
                dreamContent : null, //梦想内容
                dreamList : [] //梦想列表
            }
        },
        mounted() {
            this.isShowAffix = true;
            this.initDreams(); //初始化梦想
        },
        methods:{
            //许下梦想
            toDreamWall() {
                var dreamTitle = this.dreamTitle;
                var dreamContent = this.dreamContent;
                //参数校验
                if(!this.addoileUtil.validateReq(dreamTitle) || !this.addoileUtil.validateReq(dreamContent)){
                    this.$Message.warning("一个完整的梦想有助于你梦想成真哦",3);
                    return;
                }

                if(dreamTitle.length > 32){
                    this.$Message.warning("梦想标题字数不能多余32个",3);
                    return;
                }

                if(dreamContent.length > 500){
                    this.$Message.warning("梦想内容字数不能多余500个",3);
                    return;
                }
                //发送至服务器
                this.axios.post('addDream',{
                    title:dreamTitle,
                    content:dreamContent
                }).then(function (res) {
                    var response = res.data;
                    if(response.code == 0 && response.data == 1){
                        this.dreamList.unshift({dreamTitle:dreamTitle,dreamContent:dreamContent});
                        //弹窗提示
                        this.$Notice.success({
                            title: '<h2>许愿成功,愿您早日实现自己的梦想,加油!</h2>'
                        });
                    }else{
                        this.$Notice.info({
                            title: '<h2>抱歉,您的梦想已经跳出系统,一定可以成真</h2><h4>其实,是我们系统出错了,抱歉</h4>'
                        });
                    }
                    //清空数据
                    this.dreamTitle = null;
                    this.dreamContent = null;
                }.bind(this));
            },
            //初始化梦想
            initDreams() {
                this.axios.get('getDreams').then(function (res) {
                    if(res.data.code == 0){
                        var response = res.data.data;
                        for(var i = 0 ; i < response.length ; i++){
                            var dream = response[i];
                            //遍历更换 梦想内容的背景
                            var alertType = "success";
                            if(i % 3 == 0){
                                alertType = "success";
                            }else if(i % 3 == 1){
                                alertType = "warning";
                            }else{
                                alertType = "error";
                            }
                            this.dreamList.push({dreamTitle : dream.title , dreamContent : dream.content,alertType:alertType});
                        }
                    }
                }.bind(this));
            }
        }

    }
</script>