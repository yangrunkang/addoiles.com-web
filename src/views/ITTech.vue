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

                    <Timeline-item v-for="pithiness in itTechDto.pithinessList" key="pithiness.id">
                        <a @click="toITArticle(pithiness.articleId)" >
                            <a class="time" >{{pithiness.title}}</a>
                            <p class="content">{{pithiness.subTitle}}</p>
                        </a>
                    </Timeline-item>

                    <Timeline-item>
                        <a @click="showMore">
                             查看更多
                        </a>
                    </Timeline-item>
                </Timeline>
            </i-col>
            <i-col :span="spanRight">
                <div style="width: 100%" v-show="isShowDetail">
                    <Card style="background: transparent;border: transparent;border-radius: 30px">
                        <div>
                            <Card>
                                <p slot="title">
                                    {{itTechDto.article.title}}
                                </p>
                                <p v-html="itTechDto.article.content"></p>
                            </Card>
                            <Input style="margin-top: 6px" placeholder="想说点儿" v-model="commentContent">
                                <Button slot="append" icon="compose" @click="toComment(itTechDto.article.articleId)"></Button>
                            </Input>
                            <Alert type="success" v-for="comment in itTechDto.articleCommentList" key="comment.id" style="margin-top: 6px">
                                <Tag type="border" color="green">{{ comment.createTime }}</Tag>
                                <Tag color="green">{{ comment.userName }}</Tag>
                                {{ comment.content }}
                            </Alert>
                        </div>
                    </Card>
                </div>
                <div v-show="isShowMoreITs" style="width: 100%">
                    <a @click="showMoreITTechArticles(article.articleId)" v-for="article in moreITArticleList" key="article.id" >
                        <Alert>
                            {{article.title}}
                            <span slot="desc">{{article.subTitle}}</span>
                        </Alert>
                    </a>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                //左边区域占 5/24
                spanLeft : 5,
                //右边区域占 19/24
                spanRight : 19,
                //是否显示具体的文章内容
                isShowDetail : true,
                //是否显示文章列表
                isShowMoreITs : false,
                //技术沉淀
                itTechDto : { //对象不同于数组,数组不需要定义这么详细,例如Experience.vue中的,对象需要定义详细点,否则找不到相关属性,虽然页面可以渲染出来
                    pithinessList:[],
                    article : {
                        articleId : '',
                        title : '',
                        content : ''
                    },
                    articleCommentList:[]
                },
                //点击 显示更多 显示的列表
                moreITArticleList : [],
                //评论内容
                commentContent : ''
            }
        },
        methods: {
            //控制展示具体的文章详情
            toITArticle(articleId) {
                this.isShowDetail = true;
                this.isShowMoreITs = false;
                this.initITTech(articleId);
            },
            //控制右边区域是否展示文章列表
            showMore(){
                this.isShowDetail = false;
                this.isShowMoreITs = true;
                //展示文章列表
                this.axios.get('showMoreITTechArticles').then(function (resp) {
                    if (resp.data.code == 0) {
                        var dataArray = resp.data.data;
                        for(var i = 0; i < dataArray.length; i++){
                            this.moreITArticleList.push({
                                articleId:dataArray[i].articleId,
                                title:dataArray[i].title,
                                subTitle:dataArray[i].subTitle
                            });
                        }
                    }
                }.bind(this));
            },
            showMoreITTechArticles(articleId){
                this.toITArticle(articleId);
                this.moreITArticleList = [];
            },
            //文章显示
            initITTech(articleId){
                console.log(articleId);
                var url = articleId == null ? "getITTechArticleList" : "getITTechArticleList?articleId=" + articleId;
                this.axios.get(url).then(function (resp) {
                    if(resp.data.code == 0){
                        var data = resp.data.data;
                        //右侧列表简表
                        let _pithinessList = [];
                        for(var i = 0; i < data.pithinessList.length; i++){
                            var _data = data.pithinessList[i];
                            _pithinessList.push({
                                articleId:_data.articleId,
                                title:_data.title,
                                subTitle:_data.subTitle
                            });
                            if(i == 5){ //简表只显示6条 ,显示更多 全部显示
                                break;
                            }
                        }
                        //文章评论
                        let _articleCommentList = [];
                        for(var i = 0; i < data.articleCommentList.length; i++){
                            var _data = data.articleCommentList[i];
                            _articleCommentList.push({userName : _data.userId,createTime:_data.createTime,content:_data.content});
                        }
                        //具体文章
                        var _article = data.article;
                        //封装
                        this.itTechDto = {
                            pithinessList : _pithinessList,
                            article : {
                                articleId : _article.articleId,
                                title : _article.title,
                                content : _article.content
                            },
                            articleCommentList : _articleCommentList
                        };
                    }
                }.bind(this));
            },
            toComment(articleId){
                var commentContent = this.commentContent;
                /*下面的和Experience.vue不一样,不要头脑热改了..*/
                if(!this.addoileUtil.validateReq(commentContent)){
                    this.$Notice.info({
                        desc: '评论内容为空'
                    });
                    return;
                }
                //请求后台
                var params = new URLSearchParams();
                params.append('userId', '如果没有登录,禁止评论'); //todo 如果没有登录,禁止评论
                params.append('targetId', articleId);
                params.append('content', commentContent);
                this.axios.post('addComment',params).then(function (res) {
                    var response = res.data;
                    if(response.code == 0 && response.data == 1){
                        //弹窗提示
                        this.$Notice.success({
                            title: '<h2>评论成功</h2>'
                        });
                        //显示评论信息
                        this.itTechDto.articleCommentList.unshift({
                            createTime:'刚刚',
                            userName:'我',
                            content:commentContent
                        })
                        //清空数据
                        this.commentContent = '';
                    }else{
                        this.$Notice.info({
                            title: '<h2>系统出错了,抱歉</h2>'
                        });
                    }
                }.bind(this));
            }
        },
        mounted () {
            //初始化文章列表 和 显示第一篇文章详情内容
            this.initITTech(null);
        }
    }
</script>