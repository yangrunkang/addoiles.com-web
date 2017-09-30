<style scoped lang="less">
    @import "../styles/common.css";

    .time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }



</style>
<template>
    <div class="main-content">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Timeline>

                    <Timeline-item>
                        <a @click="toITArticle('id1')">
                            <a class="time" >Java序列化</a>
                            <p class="content">真是经历</p>
                        </a>
                    </Timeline-item>

                    <Timeline-item>
                        <a @click="showMore">
                             查看更多(在右边显示文章列表)
                        </a>
                    </Timeline-item>
                </Timeline>
            </i-col>
            <i-col :span="spanRight">
                <div style="width: 100%" v-show="isShowDetail">
                    <Card  style="background: transparent;border: transparent;border-radius: 30px">
                        <Card>
                            <p slot="title" style="height: inherit;">
                                <!--<Icon type="ios-barcode-outline" size="40"></Icon>-->
                                <!-- <span style="font-size: 30px;background-color: #0000f6;">{{ ITTitle}}</span>-->
                                <!-- <a href="#" slot="extra" @click.prevent="changeLimit">
                                     <Icon type="thumbsup"></Icon>
                                 </a>-->
                                <span style="font-size: 20px;">{{ ITTitle}}</span>
                            </p>
                            <p>{{ITContent}}</p>
                        </Card>
                        <Input style="margin-top: 6px" placeholder="想说点儿"><Button slot="append" icon="compose"></Button></Input>
                        <Alert type="success"  style="margin-top: 6px"><Tag type="border" color="green">2017-09-20</Tag><Tag color="green">kite</Tag>这篇文章写的真好</Alert>
                    </Card>
                </div>


                <div v-show="isShowMoreITs" style="width: 100%">

                    <a @click="toITArticle('ids')" >
                        <Alert>
                            成功提示文案
                            <span slot="desc">成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案成功的提示描述文案</span>
                        </Alert>
                    </a>

                    <Alert>
                        警告提示文案
                        <template slot="desc">
                            警告的提示描述文案警告的提示描述文案警告的提示描述文案
                        </template>
                    </Alert>
                    <Alert >
                        错误提示文案
                    <span slot="desc">
                        自定义错误描述文案。
                     </span>
                    </Alert>
                    <Alert>
                        自定义图标
                        <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
                        <template slot="desc">自定义图标文案自定义图标文案自定义图标文案自定义图标文案自定义图标文案</template>
                    </Alert>
                </div>

            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19,
                ITTitle: '史蒂夫', //文章标题
                ITContent:'他是个很棒的人',//文章内容
                isShowDetail:true, //控制具体文章
                isShowMoreITs: false //文章列表
            }
        },
        methods: {
            //具体的文章详情
            toITArticle(id) {
                console.log(id);
                this.isShowDetail = true;
                this.isShowMoreITs = false;
                this.ITTitle = "史蒂夫" + id;
                this.ITContent = "他是个很棒的人" + id;
            },

            //文章列表
            showMore(){
                this.isShowDetail = false;
                this.isShowMoreITs = true;
            }
        },
        mounted () {

        }
    }
</script>