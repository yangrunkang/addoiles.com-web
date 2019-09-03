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
                    <!--本站技术栈-->
                    <!--<Alert style="margin-top: 2px;background-color:orange;padding-left: 76px"><a style="color: white;font-size: 15px;">本站技术栈</a></Alert>-->
                </Affix>
            </i-col>
            <!--右边: 文章编辑/展示/添加-->
            <i-col :span="spanRight">
                <!--路由-->
                <router-view v-if="isRouterAlive"></router-view>
                <!--文章列表-->
                <div style="width: 100%" v-if="!isRouterAlive">
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
        //在本页注册一个方法
        provide() {
            return {
                reload: this.reload
            }
        },
        data () {
            return {
                //加载更多按钮是否可用
                loadMoreBtnDisabled:false,
                //左边区域占 5/24
                spanLeft : 5,
                //右边区域占 19/24
                spanRight : 19,
                //IT文章简表
                pithinessList:[],
                //点击 显示更多 显示的列表
                moreITArticleList : [],
                //页面查询基础Dto
                queryDto : {
                    page : {
                        pageNo: 0,
                        pageSize: 20
                    }
                },
                // ITArticleView 路由是否激活
                isRouterAlive: true
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
                // 显示ITArticleView页面
                this.isRouterAlive = true;
                // 需要展示的IT文章Id
                sessionStorage.setItem("ITArticleViewId",articleId);
                this.$router.replace("/ITArticleView");
                // 调用reload方法来局部刷新展示ITArticleView
                this.reload();
            },
            /**
             * 控制右边区域是否展示文章列表
             * flag ：true 点击右侧[查看更多]进入 false 点击[加载更多]进入
             */
            showMore(flag){
                // 移除ITArticleView页面
                this.isRouterAlive = false;
                this.loadMoreBtnDisabled = false;
                if(flag){
                    this.moreITArticleList = [];
                    //分页要恢复,如果不恢复再回去点击[查看更多]会查不到数据,因为分页数已经超过实际条数了
                    this.queryDto = {
                        page : {
                            pageNo: 0,
                            pageSize: 20
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

                        //按照url参数来判断显示url链接文章还是默认第一个文章
                        let businessId = this.$route.query.businessId;
                        if(!this.addoileUtil.validateReq(businessId)){
                            this.getITArticleDetail(this.pithinessList[0].articleId);
                        }
                    }
                }.bind(this));
            },

            /**
             * 加载更多
             */
            loadMore(){
                this.queryDto.page.pageNo += this.queryDto.page.pageSize;
                this.showMore(false);
            },
            /**
             * 到达评论区位置
             */
            toCommentITArticle(){
                window.scrollTo(0,document.body.scrollHeight);
            },
            // 注册到方法
            reload() {
                this.isRouterAlive = false
                this.$nextTick(function() {
                    this.isRouterAlive = true
                })
            }
        },
        mounted () {
            let businessId = this.$route.query.businessId;
            if(this.addoileUtil.validateReq(businessId)){
                this.getITArticleDetail(businessId);
            }
            this.initPithinessList();
        }
    }
</script>