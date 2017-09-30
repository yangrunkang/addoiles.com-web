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
                        <a class="time" @click="toITArticle('id1    ')">Java序列化</a>
                        <p class="content">真是经历</p>
                    </Timeline-item>
                    <Timeline-item>
                        <a class="time" @click="toITArticle">Linux文件</a>
                        <p class="content">windows和Linux文件格式</p>
                    </Timeline-item>
                    <Timeline-item>
                        <a class="time" @click="toITArticle">灰度发布</a>
                        <p class="content">何为灰度发布</p>
                    </Timeline-item>
                    <Timeline-item>
                        <a class="time" @click="toITArticle">分布式应用</a>
                        <p class="content">分布式应用设计</p>
                    </Timeline-item>
                    <Timeline-item><a href="#" @click="showMore">查看更多(在右边显示文章列表)</a></Timeline-item>
                </Timeline>
            </i-col>
            <i-col :span="spanRight">
                <Card v-show="isShowDetail">
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
                value2: '1',
                ITTitle: '史蒂夫',
                ITContent:'他是个很棒的人',
                isShowDetail:true,
                isShowMoreITs: false
            }
        },
        methods: {
            toITArticle(id) {
                console.log(id);
                this.isShowDetail = true;
                this.isShowMoreITs = false;
                this.ITTitle = "史蒂夫" + id;
                this.ITContent = "他是个很棒的人" + id;
            },
            showMore(){
                this.isShowDetail = false;
                this.isShowMoreITs = true;
            }
        },
        mounted () {

        }
    }
</script>