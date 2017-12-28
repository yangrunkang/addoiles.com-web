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
    <div>
        <Row type="flex">
            <!--左边:文章简表-->
            <i-col :span="spanLeft" class="layout-menu-left">
                <Button type="info" size="large" long @click="toWriteITArticle()" style="width: 70%;margin-bottom: 40px" >技术分享</Button>
                <Timeline pending>
                    <Timeline-item v-for="pithiness in itTechDto.pithinessList" :key="pithiness.id">
                        <a @click="toITArticle(pithiness.articleId)" >
                            <a class="time auto-break-line" >{{pithiness.title}}</a>
                        </a>
                    </Timeline-item>

                    <Timeline-item>
                        <a @click="showMore(true)">
                            <a>查看更多</a>
                        </a>
                    </Timeline-item>
                </Timeline>

            </i-col>
            <!--右边: 文章编辑/展示/添加-->
            <i-col :span="spanRight">
                <div v-show="showDetailITTech">
                    <!--文章详情-->
                    <Card style="background: transparent;border: transparent;border-radius: 30px">
                        <div>
                            <Card>
                                <p slot="title" class="auto-break-line" style="height: auto;font-size: 18px">
                                    {{itTechDto.article.title}}
                                    <Button type="info" shape="circle" style="float: right" v-show="itTechDto.article.isShowEditBtn" @click="toEditITArticle(itTechDto.article.articleId)">编辑</Button>
                                </p>
                                <p v-html="itTechDto.article.content" class="auto-break-line"></p>
                            </Card>
                            <Input style="margin-top: 6px" placeholder="想说点儿" v-model="commentContent">
                            <Button slot="append" icon="compose" @click="toComment(itTechDto.article.articleId)"></Button>
                            </Input>
                            <Alert type="success" v-for="comment in itTechDto.articleCommentList" :key="comment.id" style="margin-top: 6px">
                                <Tag type="border" color="green">{{ comment.createTime }}</Tag>
                                <Tag color="green">{{ comment.userName }}</Tag>
                                {{ comment.content }}
                            </Alert>
                        </div>
                    </Card>
                </div>

                <!--点击展示更多,显示此区域-->
                <div v-show="isShowMoreITs" style="width: 100%">
                    <a @click="showMoreITTechArticles(article.articleId)" v-for="article in moreITArticleList" :key="article.id" >
                        <Alert show-icon>
                            <h3>{{article.title}}</h3>
                            <Icon :type="article.iconType" slot="icon"></Icon>
                        </Alert>
                    </a>
                    <Button type="info" size="large" long style="width: 100%;margin-top: 10px" @click="loadMore()">加载更多</Button>
                </div>

            </i-col>
        </Row>
    </div>
</template>
<script>

    import Vue from 'vue';
    //安装vue-quill-editor富文本编辑器
    import VueQuillEditor from 'vue-quill-editor';
    import Cookies from 'js-cookie';
    Vue.use(VueQuillEditor);

    export default {
        data () {
            return {
                //左边区域占 5/24
                spanLeft : 5,
                //右边区域占 19/24
                spanRight : 19,
                //是否显示文章列表
                isShowMoreITs : false,
                //是否显示文章详情
                showDetailITTech: true,
                //技术沉淀
                itTechDto : { //对象不同于数组,数组不需要定义这么详细,例如Experience.vue中的,对象需要定义详细点,否则找不到相关属性,虽然页面可以渲染出来
                    pithinessList:[],
                    article : {
                        articleId : '',
                        title : '',
                        userId:'',
                        content : '',
                        isShowEditBtn:false //是否显示编辑按钮
                    },
                    articleCommentList:[]
                },
                //点击 显示更多 显示的列表
                moreITArticleList : [],
                //评论内容
                commentContent : '',
                // IT文章内容
                ITContent : '',
                // IT文章标题
                ITTitle:'',
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

            toWriteITArticle(){
                let editObj = {
                    articleType:2,
                };

                sessionStorage.setItem("editObj",JSON.stringify(editObj));

                this.$router.push("/OilEditor");
            },
            //控制展示具体的文章详情
            toITArticle(articleId) {
                this.isShowMoreITs = false;
                this.showDetailITTech = true;
                this.initITTech(articleId);
            },
            /**
             * 控制右边区域是否展示文章列表
             * flag ：true 点击右侧[查看更多]进入 false 点击[加载更多]进入
             */
            showMore(flag){
                this.isShowMoreITs = true;
                if(flag){
                    this.showDetailITTech = false;
                    this.moreITArticleList = []; //每次显示前 清空,否则狂点这个会出问题
                }

                this.queryDto.articleType = 2;
                //展示文章列表
                this.axios.post('showMoreITTechArticles',this.queryDto).then(function (resp) {
                    if (resp.data.code == 0) {
                        let dataArray = resp.data.data;
                        for(let i = 0; i < dataArray.length; i++){
                            this.moreITArticleList.push({
                                articleId:dataArray[i].articleId,
                                title:dataArray[i].title,
                                subTitle:dataArray[i].subTitle,
                                iconType:this.addoileUtil.getRandomIcon()
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

                this.queryDto.articleType=2;
                this.queryDto.businessId=articleId;

                this.axios.post('getITArticleList',this.queryDto).then(function (resp) {
                    if(resp.data.code == 0){
                        let data = resp.data.data;
                        //右侧列表简表
                        let _pithinessList = [];
                        for(let i = 0; i < data.pithinessList.length; i++){
                            let _data = data.pithinessList[i];
                            _pithinessList.push({
                                articleId:_data.articleId,
                                title:_data.title
                            });
                            if(i == 10){ //简表只显示10条 ,显示更多 全部显示
                                break;
                            }
                        }
                        //文章评论
                        let _articleCommentList = [];
                        for(let i = 0; i < data.articleCommentList.length; i++){
                            let _data = data.articleCommentList[i];
                            _articleCommentList.push({
                                userName : _data.userName,
//                                createTime:this.moment(_data.createTime).format('YYYY-MM-DD HH:mm:ss'),
                                createTime:this.addoileUtil.formatUnixTime(_data.createTime),
                                content:_data.content});
                        }
                        //具体文章
                        let _article = data.article;

                        let currentUserId = sessionStorage.getItem("userId");
                        //封装
                        this.itTechDto = {
                            pithinessList : _pithinessList,
                            article : {
                                articleId : _article.articleId,
                                userId:_article.userId,
                                title : _article.title,
                                subTitle:_article.subTitle,
                                content : _article.content,
                                isShowEditBtn:this.addoileUtil.isCurrentUser(_article.userId,currentUserId)
                            },
                            articleCommentList : _articleCommentList
                        };
                    }
                }.bind(this));
            },
            toComment(articleId){

                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }

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
                    userId:userId,
                    targetId:articleId,
                    content:commentContent
                }).then(function (res) {
                    let response = res.data;
                    if(response.code == 0 && response.data == 1){
                        //弹窗提示
                        this.$Notice.success({
                            title: '<h6>评论成功</h6>'
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
                            title: '<h6>系统出错了,抱歉</h6>'
                        });
                    }
                }.bind(this));
            },
            /**
             * 编辑IT文章
             * @param articleId 文章id
             * @param title 大名
             * @param subTitle 小名
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
                this.showMore(true);
            }
        },
        mounted () {
            //初始化文章列表 和 显示第一篇文章详情内容
            this.initITTech(null);
        }
    }
</script>