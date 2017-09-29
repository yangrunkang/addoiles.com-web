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
</style>
<template>

    <div>
        <Affix :offset-bottom="10" >
            <span class="demo-affix" v-show="isShowAffix">
                <Input placeholder="写下你的梦想" v-model="dreamTitle">
                    <Button slot="append" @click="down">许下</Button>
                </Input>
                <Input style="padding-top: 5px"  type="textarea" :rows="3" placeholder="例如:我的梦想是实现自己的价值,做自己喜欢做的事情" v-model="dreamContent"/>
            </span>
        </Affix>
        <div class="main-content">
            <!--todo for循环 每行Card有间隔,大小相等-->
            <Row :gutter="16">
                <!--<Col span="8">-->
                    <Card :bordered="true" v-for="item in dreamList" :key="item.id">
                        <p slot="title" >{{item.dreamTitle}}</p>
                        <p>
                            {{item.dreamContent}}
                        </p>
                    </Card>
                <!--</Col>-->
                <!--<Col span="8">
                    <Card :bordered="true">
                        <p slot="title">看更多的书</p>
                        <p>
                            读书使人进步
                        </p>
                    </Card>
                </Col>
                <Col span="8">
                    <Card :bordered="true">
                        <p slot="title">看更多的书</p>
                        <p>
                            读书使人进步
                        </p>
                    </Card>
                </Col>-->
            </Row>
        </div>
    </div>


</template>
<script>
    export default {
        data () {
            return {
                isShowAffix : false, //一开始不显示,5秒后显示
                dreamTitle : null,
                dreamContent : null,
                dreamList:[
                    {dreamTitle:"我的萌新嘎嘎会",dreamContent:"alc"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"积分老师乱",dreamContent:"富士达"},
                    {dreamTitle:"发顺丰翁",dreamContent:"as发广告"}
                ]
            }
        },
        mounted() {
            // you can use current editor object to do something(editor methods)
            // this.editor to do something...
            //5秒后显示 打开/关闭 编辑框的 Affix
            setTimeout(() => {
                this.isShowAffix = true;
            },5);
        },
        methods:{
            down:function () {
                if(this.dreamTitle == null || this.dreamContent == null || this.dreamTitle.trim() == '' || this.dreamContent.trim() == ''){
                    this.$Message.warning("一个完整的梦想有助于你梦想成真哦",3);
                    return;
                }
                this.$Notice.success({
                    title: '你的梦想',
                    desc: "梦想标题:" + this.dreamTitle + "梦想内容:" + this.dreamContent
                });
                this.dreamList.push({dreamTitle:this.dreamTitle,dreamContent:this.dreamContent});//可能在methods可以使用this吧

            }
        }

    }
</script>