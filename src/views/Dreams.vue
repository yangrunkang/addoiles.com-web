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
</style>
<template>
    <div>
        <Affix :offset-bottom="10" >
            <span class="demo-affix" v-show="isShowAffix">
                <Input placeholder="写下你的梦想" v-model="dreamTitle">
                    <Button slot="append" @click="toDreamWall">许下</Button>
                </Input>
                <Input style="padding-top: 5px"  type="textarea" :rows="3" placeholder="例如:我的梦想是实现自己的价值,做自己喜欢做的事情" v-model="dreamContent"/>
            </span>
        </Affix>
        <div class="main-content">
            <ul>
                <li v-for="item in dreamList" :key="item.id">
                    <Card style="background: transparent;border: transparent;border-radius: 30px">
                        <div style="margin: inherit">
                            <Alert type="success">
                                {{item.dreamTitle}}
                                <span slot="desc">{{item.dreamContent}}</span>
                            </Alert>
                            <div>
                                <Button type="info" shape="circle">为Ta加油</Button>
                                <Button type="success" shape="circle">同理想</Button>
                            </div>
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
                dreamList:[] //梦想列表
            }
        },
        mounted() {
            this.isShowAffix = true;
            this.initDreams(); //初始化梦想
        },
        methods:{
            toDreamWall() {
                var dreamTitle = this.dreamTitle;
                var dreamContent = this.dreamContent;
                //参数校验
                if(dreamTitle == null || dreamContent == null || dreamTitle.trim() == '' || dreamContent.trim() == ''){
                    this.$Message.warning("一个完整的梦想有助于你梦想成真哦",3);
                    return;
                }
                var params = new URLSearchParams();
                params.append('title', dreamTitle);
                params.append('content', dreamContent);
                //发送至服务器
                this.axios.post('addDream',params).then(function (res) {
                    var response = res.data;
                    if(response.code == 0 && response.data == 1){
                        let tmpDreamList = []; //声明临时数组,用于将用户添加的梦想放到数据的第一位
                        tmpDreamList.push({dreamTitle:dreamTitle,dreamContent:dreamContent});
                        for(var i =0 ;i<this.dreamList.length ; i++){
                            tmpDreamList.push(this.dreamList[i]);
                        }
                        this.dreamList = tmpDreamList; //可能在methods可以使用this吧
                        //弹窗提示
                        this.$Notice.success({
                            title: '<h2>许愿成功,愿您早日实现自己的梦想,加油!</h2>'
                        });
                    }else{
                        this.$Notice.info({
                            title: '<h2>抱歉,您的梦想已经跳出系统,一定可以成真</h2><h4>其实,是我们系统出错了,抱歉</h4>'
                        });
                    }
                }.bind(this));
            },
            //初始化梦想
            initDreams() {
                this.axios.get('getDreams').then(function (res) {
                    if(res.data.code == 0){
                        var resp = res.data.data;
                        for(var i =0 ;i<resp.length ; i++){
                            this.dreamList.push({dreamTitle : resp[i].title , dreamContent : resp[i].content});
                        }
                    }
                }.bind(this));
            }
        }

    }
</script>