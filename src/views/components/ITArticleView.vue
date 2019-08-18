<!--技术文章浏览页面-->
<template>
    <div>
        <Card shadow>
            <p slot="title" class="auto-break-line" style="height: auto;font-size: 18px">
                {{itTechDto.article.title}}
                <!--<Button type="info" shape="circle" style="float: right;margin-left: 2px;"-->
                        <!--v-clipboard="itArticleShareUrl" @success="copySuccess" @error="copyError">获取分享链接-->
                <!--</Button>-->
            </p>
            <div class="ql-snow">
                <div class="ql-editor">
                    <p class="auto-break-line web-content-font-size" v-html="itTechDto.article.content"></p>
                </div>
            </div>
            <p class="p-right">
                <Icon type="calendar"></Icon>
                创建时间:{{itTechDto.article.createTime}}
            </p>
            <p class="p-right">
                <Icon type="person"></Icon>
                作者:{{itTechDto.article.userName}}
            </p>
            <!--评论区域-->
            <Card shaow>
                <Input style="margin-top: 6px" placeholder="评论" v-model="commentContent">
                <Button slot="append" icon="compose" @click="toComment(itTechDto.article.articleId)"/>
                </Input>
                <Alert type="success" v-for="comment in itTechDto.articleCommentList" :key="comment.id"
                       style="margin-top: 6px">
                    <Tag type="border" color="green">{{ comment.createTime }}</Tag>
                    <Tag color="green">{{ comment.userName }}</Tag>
                    {{ comment.content }}
                </Alert>
            </Card>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "i-t-article-view",
        // 注入 ITTech 页面 写的reload方法
        inject: ['reload'],
        data() {
            return {
                //IT文章详情
                itTechDto: { //对象不同于数组,数组不需要定义这么详细,例如Experience.vue中的,对象需要定义详细点,否则找不到相关属性,虽然页面可以渲染出来
                    article: {
                        articleId: '',
                        userId: '',
                        title: '',
                        content: '',
                    },
                    articleCommentList: []
                },
                //评论内容
                commentContent : '',
                //分享url
                itArticleShareUrl:'',
                //页面查询基础Dto
                queryDto : {
                    page : {
                        pageNo: 0,
                        pageSize: 20
                    }
                },
            }
        },
        methods: {
            toComment(articleId) {

                let commentContent = this.commentContent;
                /*下面的和Experience.vue不一样,不要头脑热改了..*/
                if (!this.addoileUtil.validateReq(commentContent)) {
                    this.$Notice.info({
                        desc: '评论内容为空'
                    });
                    return;
                }

                if (commentContent.length > 100) {
                    this.$Message.warning("评论字数不能多余100个", 3);
                    return;
                }

                //请求后台
                this.axios.post('addComment', {
                    userId: sessionStorage.getItem("userId"),
                    tokenId: sessionStorage.getItem("tokenId"),
                    targetId: articleId,
                    content: commentContent
                }).then(function (response) {
                    if (response.code === 0 && response.data === 1) {
                        //弹窗提示
                        this.$Notice.success({
                            title: '<h6>评论成功</h6>'
                        });
                        //显示评论信息
                        this.itTechDto.articleCommentList.unshift({
                            createTime: '刚刚',
                            userName: '我',
                            content: commentContent
                        });
                        //清空数据
                        this.commentContent = '';
                    } else {
                        this.$Notice.info({
                            title: '<h6>系统出错了,抱歉</h6>'
                        });
                    }
                }.bind(this));
            },
            /**
             * 复制成功
             */
            copySuccess(){
                this.$Notice.success({
                    title: '分享链接已复制至剪贴板',
                    desc: '可以分享给好友啦~'
                });
            },
            /**
             * 复制失败
             */
            copyError(){
                this.$Notice.error({
                    title: '复制分享链接失败',
                    desc: '出错啦'
                });
            },
            //文章显示
            initITTech(articleId){
                if(articleId == null){
                    this.$store.commit('loadingFailed',this);
                    return;
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

                        //封装
                        this.itTechDto = {
                            article : {
                                articleId : _article.articleId,
                                userId:_article.userId,
                                title : _article.title,
                                content : _article.content,
                                userName : _article.userName,
                                createTime:this.addoileUtil.formatUnixTime(_article.createTime),
                                updateTime:this.addoileUtil.formatUnixTime(_article.updateTime)
                            },
                            articleCommentList : _articleCommentList
                        };

                        //回到文章顶部
                        window.scrollTo(0,0);
                        // this.reload();
                        //分享链接
                        this.itArticleShareUrl = this.axios.defaults.webSite+'ITTech?businessId=' + articleId;
                    }else{
                        this.$store.commit('loadingFailed',this);
                    }

                }.bind(this));

            },
        },
        mounted () {
            let articleId = sessionStorage.getItem("ITArticleViewId");
            this.initITTech(articleId);
        }

    }
</script>

<style scoped>

</style>