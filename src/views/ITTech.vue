<style scoped lang="less">
    @import "../styles/common.css";

    .pithiness-title{
        font-size: 13px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }

    .p-left {
        text-align: left;
        font-size: 13px;
    }

    .it-article-list {
        margin-bottom: 5px;
    }

    .it-article-title {
        font-size: 19px;
        color: black;
    }
</style>
<template>
    <div>
        <Row type="flex" :gutter="10">
            <!--左边:文章简表-->
            <i-col :span="spanLeft">
                <Affix :offset-top="10">
                    <Button type="info" size="large" long @click="toWriteITArticle()" style="margin-bottom: 10px">技术分享</Button>
                    <Card shadow>
                        <Timeline pending>
                            <Timeline-item v-for="pithiness in pithinessList" :key="pithiness.id">
                                <a @click="getITArticleDetail(pithiness.articleId)" >
                                    <a class="pithiness-title auto-break-line" >{{pithiness.title}}</a>
                                </a>
                            </Timeline-item>

                            <Timeline-item>
                                <a @click="showMore(true)">
                                    <a>查看更多</a>
                                </a>
                            </Timeline-item>
                        </Timeline>
                    </Card>
                    <Button type="info" size="large" long @click="toCommentITArticle()" style="margin-top: 10px">评论当前文章</Button>
                </Affix>
            </i-col>
            <!--右边: 文章编辑/展示/添加-->
            <i-col :span="spanRight">
                <div v-show="showDetailITTech">
                    <!--文章详情-->
                    <Card  shadow>
                        <p slot="title" class="auto-break-line" style="height: auto;font-size: 18px">
                            {{itTechDto.article.title}}
                            <Button type="info" shape="circle" style="float: right" v-show="itTechDto.article.isShowEditBtn" @click="toEditITArticle(itTechDto.article.articleId)">编辑</Button>
                        </p>
                        <p class="p-right"><Icon type="person"></Icon>作者:{{itTechDto.article.userName}}</p>
                        <div class="ql-snow">
                            <div class="ql-editor">
                                <p class="auto-break-line web-content-font-size" v-html="itTechDto.article.content"></p>
                            </div>
                        </div>
                        <p class="p-right"><Icon type="calendar"></Icon>创建时间:{{itTechDto.article.createTime}}</p>
                        <p class="p-right"><span v-if="itTechDto.article.updateTime !== '-1'"><Icon type="calendar"></Icon>修改时间:{{itTechDto.article.updateTime}}</span></p>
                    </Card>
                    <!--评论区域-->
                    <Card>
                        <h2>评论</h2>
                        <Input style="margin-top: 6px" placeholder="想说点儿" v-model="commentContent">
                        <Button slot="append" icon="compose" @click="toComment(itTechDto.article.articleId)" />
                        </Input>
                        <Alert type="success" v-for="comment in itTechDto.articleCommentList" :key="comment.id" style="margin-top: 6px">
                            <Tag type="border" color="green">{{ comment.createTime }}</Tag>
                            <Tag color="green">{{ comment.userName }}</Tag>
                            {{ comment.content }}
                        </Alert>
                    </Card>
                </div>

                <!--点击展示更多,显示此区域-->
                <div v-show="isShowMoreITs" style="width: 100%">

                    <Card v-for="article in moreITArticleList" :key="article.id" class="it-article-list">
                        <a class="it-article-title auto-break-line" @click="showMoreITTechArticles(article.articleId)">
                            <Icon :type="article.iconType"></Icon> &nbsp; {{article.title}}
                        </a>
                        <p class="p-left">
                            <Icon type="calendar"></Icon>&nbsp;{{article.createTime}}
                        </p>
                    </Card>
                    <Button type="info" size="large" long style="width: 100%;margin-top: 10px" :disabled="loadMoreBtnDisabled" @click="loadMore()">
                        <div v-show="loadMoreBtnDisabled">已全部加载</div>
                        <div v-show="!loadMoreBtnDisabled">加载更多</div>
                    </Button>
                </div>

            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                //加载更多按钮是否可用
                loadMoreBtnDisabled:false,
                //左边区域占 5/24
                spanLeft : 5,
                //右边区域占 19/24
                spanRight : 19,
                //是否显示文章列表
                isShowMoreITs : false,
                //是否显示文章详情
                showDetailITTech: true,
                //IT文章简表
                pithinessList:[],
                //IT文章详情
                itTechDto : { //对象不同于数组,数组不需要定义这么详细,例如Experience.vue中的,对象需要定义详细点,否则找不到相关属性,虽然页面可以渲染出来
                    article : {
                        articleId : '',
                        userId:'',
                        title : '',
                        content : '',
                        isShowEditBtn:false //是否显示编辑按钮
                    },
                    articleCommentList:[]
                },
                //点击 显示更多 显示的列表
                moreITArticleList : [],
                //评论内容
                commentContent : '',
                //页面查询基础Dto
                queryDto : {
                    page : {
                        pageNo: 0,
                        pageSize: 10
                    }
                }
            }
        },
        methods: {

            /*去写文章*/
            toWriteITArticle(){
                /*入口校验*/
                this.$store.commit('validateLogin',this);
                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return null;
                }
                /*入口校验End*/

                let editObj = {
                    articleType:2,
                };

                sessionStorage.setItem("editObj",JSON.stringify(editObj));

                this.$router.push("/OilEditor");
            },
            //控制展示具体的文章详情
            getITArticleDetail(articleId) {
                this.isShowMoreITs = false;
                this.showDetailITTech = true;
                this.initITTech(articleId);
            },
            /**
             * 控制右边区域是否展示文章列表
             * flag ：true 点击右侧[查看更多]进入 false 点击[加载更多]进入
             */
            showMore(flag){
                this.loadMoreBtnDisabled = false;
                this.isShowMoreITs = true;
                if(flag){
                    this.showDetailITTech = false;
                    this.moreITArticleList = [];
                    //分页要恢复,如果不恢复再回去点击[查看更多]会查不到数据,因为分页数已经超过实际条数了
                    this.queryDto = {
                        page : {
                            pageNo: 0,
                            pageSize: 10
                        }
                    }
                }

                this.queryDto.articleType = 2;
                //展示文章列表
                this.axios.post('moreArticles',this.queryDto).then(function (resp) {
                    if (resp.code === 0) {
                        let dataArray = resp.data;
                        if(dataArray.length > 0){
                            for(let i = 0; i < dataArray.length; i++){
                                this.moreITArticleList.push({
                                    articleId:dataArray[i].articleId,
                                    title:dataArray[i].title,
                                    iconType:this.addoileUtil.getRandomIcon(),
                                    createTime:this.addoileUtil.formatUnixTime(dataArray[i].createTime)
                                });
                            }
                        }else{
                            this.loadMoreBtnDisabled = true;
                        }
                    }
                }.bind(this));
            },
            showMoreITTechArticles(articleId){
                this.getITArticleDetail(articleId);
                this.moreITArticleList = [];
            },
            //文章显示
            initITTech(articleId){

                if(articleId == null){
                    articleId = this.pithinessList[0].articleId;
                }

                this.queryDto.articleType=2;
                this.queryDto.businessId=articleId;

                this.axios.post('ITArticle',this.queryDto).then(function (resp) {
                    if(resp.code === 0){
                        let data = resp.data;

                        //文章评论
                        let _articleCommentList = [];
                        for(let i = 0; i < data.articleCommentList.length; i++){
                            let _data = data.articleCommentList[i];
                            _articleCommentList.push({
                                userName : _data.userName,
                                createTime:this.addoileUtil.formatUnixTime(_data.createTime),
                                content:_data.content
                            });
                        }
                        //具体文章
                        let _article = data.article;

                        let currentUserId = sessionStorage.getItem("userId");
                        //封装
                        this.itTechDto = {
                            article : {
                                articleId : _article.articleId,
                                userId:_article.userId,
                                title : _article.title,
                                content : _article.content,
                                userName : _article.userName,
                                createTime:this.addoileUtil.formatUnixTime(_article.createTime),
                                updateTime:this.addoileUtil.formatUnixTime(_article.updateTime),
                                isShowEditBtn:this.addoileUtil.isCurrentUser(_article.userId,currentUserId)
                            },
                            articleCommentList : _articleCommentList
                        };
                        //回到文章顶部
                        window.scrollTo(0,0);
                    }else{
                        this.$store.commit('loadingFailed',this);
                    }

                }.bind(this));
            },
            /**
             * 初始化文章简表
             */
            initPithinessList(){
                this.queryDto.articleType=2;
                this.axios.post('ITPithinessList',this.queryDto).then(function (resp) {
                    if(resp.code === 0){
                        let data = resp.data;
                        //右侧列表简表
                        let _pithinessList = [];
                        for(let i = 0; i < data.length; i++){
                            let _data = data[i];
                            _pithinessList.push({
                                articleId:_data.articleId,
                                title:_data.title
                            });
                            if(i === 6){ //简表只显示10+1条 ,显示更多 全部显示
                                break;
                            }
                        }
                        //封装
                        this.pithinessList = _pithinessList;

                        //显示第一篇文章详情
                        let businessId = this.$route.params.businessId;
                        if(businessId === 'list'){
                            this.getITArticleDetail(this.pithinessList[0].articleId);
                        }
                    }
                }.bind(this));
            },
            toComment(articleId){

                let commentContent = this.commentContent;
                /*下面的和Experience.vue不一样,不要头脑热改了..*/
                if(!this.addoileUtil.validateReq(commentContent)){
                    this.$Notice.info({
                        desc: '评论内容为空'
                    });
                    return;
                }

                if(commentContent.length > 100){
                    this.$Message.warning("评论字数不能多余100个",3);
                    return;
                }

                //请求后台
                this.axios.post('addComment',{
                    userId : sessionStorage.getItem("userId"),
                    tokenId: sessionStorage.getItem("tokenId"),
                    targetId:articleId,
                    content:commentContent
                }).then(function (response) {
                    if(response.code === 0 && response.data === 1){
                        //弹窗提示
                        this.$Notice.success({
                            title: '<h6>评论成功</h6>'
                        });
                        //显示评论信息
                        this.itTechDto.articleCommentList.unshift({
                            createTime:'刚刚',
                            userName:'我',
                            content:commentContent
                        });
                        //清空数据
                        this.commentContent = '';
                    }else{
                        this.$Notice.info({
                            title: '<h6>系统出错了,抱歉</h6>'
                        });
                    }
                }.bind(this));
            },
            /**
             * 编辑IT文章
             * @param articleId 文章id
             * @param title 大名
             * @param content 内容
             */
            toEditITArticle(articleId){
                let editObj = {
                    businessId:articleId,
                };

                sessionStorage.setItem("editObj",JSON.stringify(editObj));

                this.$router.push("/OilEditor");

            },

            loadMore(){
                this.queryDto.page.pageNo += this.queryDto.page.pageSize;
                this.showMore(false);
            },
            toCommentITArticle(){
                window.scrollTo(0,document.body.scrollHeight);
            }
        },
        mounted () {
            let businessId = this.$route.params.businessId;
            if(businessId != 'list'){
                this.getITArticleDetail(businessId);
            }
            this.initPithinessList();
        }
    }
</script>