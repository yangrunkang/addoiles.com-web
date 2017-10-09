<style scoped lang="less">
    @import "../styles/common.css";

    .time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }

    /*编辑器*/
    #editorDiv {
        /*margin: 0 auto;*/
    }

</style>
<template>
    <div class="main-content">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Button type="info" size="large" long @click="writeITArticle()" style="width: 70%;margin-bottom: 40px" >写技术文章</Button>
                <Timeline pending>
                    <Timeline-item v-for="pithiness in itTechDto.pithinessList" key="pithiness.id">
                        <a @click="toITArticle(pithiness.articleId)" >
                            <a class="time auto-break-line" >{{pithiness.title}}</a>
                            <p class="content auto-break-line" >{{pithiness.subTitle}}</p>
                        </a>
                    </Timeline-item>

                    <Timeline-item>
                        <a @click="showMore">
                            <a>查看更多</a>
                        </a>
                    </Timeline-item>
                </Timeline>

            </i-col>
            <i-col :span="spanRight">

                <div id="editorDiv" v-show="isShowEditor" style="height: 1010px;">
                    <Card class="card" style="height: 998px;">
                        <p slot="title" style="height: auto;font-size: 18px">
                            篇名:
                            <Input v-model="ITTitle" title=""  size="large" type="text"  style="width: 75%"/>
                            <span style="float: right">
                                <Button type="info" shape="circle" @click="sendITArticle">发表</Button>
                                <!--<Button type="error" shape="circle" >清空内容</Button></p>-->
                                <Button type="warning" shape="circle" >保存为草稿</Button>
                            </span>
                        <p slot="title" style="height: auto;font-size: 13px;margin-top: 6px">
                            副标题:
                            <Input v-model="ITSubTitle" title=""  size="small" type="text"  style="width: 70%"/>
                        </p>
                        <!--https://surmon-china.github.io/vue-quill-editor -->
                        <quill-editor ref="myTextEditor"
                                      v-model="ITContent"
                                      :options="editorOption"
                                      @focus="onEditorFocus($event)" style="height: 800px">
                        </quill-editor>
                    </Card>
                </div>

                <div style="width: 100%" v-show="isShowDetail">
                    <Card style="background: transparent;border: transparent;border-radius: 30px">
                        <div>
                            <Card>
                                <p slot="title" class="auto-break-line" style="height: auto;font-size: 18px">
                                    {{itTechDto.article.title}}
                                    <Button type="info" shape="circle" style="float: right">编辑</Button>
                                </p>
                                <p v-html="itTechDto.article.content" class="auto-break-line"></p>
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
                        <Alert show-icon>
                            <h3>{{article.title}}</h3>
                            <Icon :type="article.iconType" slot="icon"></Icon>
                            <span slot="desc">{{article.subTitle}}</span>
                        </Alert>
                    </a>
                </div>

            </i-col>
        </Row>
    </div>
</template>
<script>

    import Vue from 'vue';
    //安装vue-quill-editor富文本编辑器
    import VueQuillEditor from 'vue-quill-editor';
    Vue.use(VueQuillEditor);

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
                //是否显示编辑器
                isShowEditor : false,
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
                commentContent : '',
                //编辑器配置
                editorOption: {
                    placeholder: '是时候展示真正的技术了\n自己脑补背景音乐'
                },
                // IT文章内容
                ITContent : '',
                // IT文章标题
                ITTitle:'',
                // IT副标题
                ITSubTitle :''
            }
        },
        methods: {
            //控制展示具体的文章详情
            toITArticle(articleId) {
                this.isShowDetail = true;
                this.isShowMoreITs = false;
                this.isShowEditor = false;
                this.initITTech(articleId);
            },
            //控制右边区域是否展示文章列表
            showMore(){
                this.isShowDetail = false;
                this.isShowMoreITs = true;
                this.isShowEditor = false;
                this.moreITArticleList = []; //每次显示前 清空,否则狂点这个会出问题
                //展示文章列表
                this.axios.get('showMoreITTechArticles').then(function (resp) {
                    if (resp.data.code == 0) {
                        var dataArray = resp.data.data;
                        for(var i = 0; i < dataArray.length; i++){

                            var iconType = "ios-lightbulb-outline";
                            if(i % 9 == 0){
                                iconType = "paper-airplane";
                            }else if(i % 9 == 1){
                                iconType = "quote";
                            }else if(i % 9 == 2){
                                iconType = "waterdrop";
                            }else if(i % 9 == 3){
                                iconType = "ios-analytics-outline";
                            }else if(i % 9 == 4){
                                iconType = "ios-wineglass-outline";
                            }else if(i % 9 == 5){
                                iconType = "android-checkbox-outline-blank";
                            }else if(i % 9 == 6){
                                iconType = "fireball";
                            }else if(i % 9 == 7){
                                iconType = "flame";
                            }else if(i % 9 == 8){
                                iconType = "ios-americanfootball-outline";
                            }else{
                                iconType = "earth";
                            }
                            this.moreITArticleList.push({
                                articleId:dataArray[i].articleId,
                                title:dataArray[i].title,
                                subTitle:dataArray[i].subTitle,
                                iconType:iconType
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
                            _articleCommentList.push({
                                userName : _data.userName,
//                                createTime:this.moment(_data.createTime).format('YYYY-MM-DD HH:mm:ss'),
                                createTime:this.addoileUtil.formatUnixTime(_data.createTime),
                                content:_data.content});
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
                //如果没有登录,禁止评论
                var userId = sessionStorage.getItem("userId");
                if(!this.addoileUtil.validateReq(userId)){
                    this.$Notice.info({
                        title: '<h2>Hi,您好,访客不允许评论</h2>'
                    });
                    return;
                }

                var commentContent = this.commentContent;
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
            },
            //写IT文章
            writeITArticle(){
                this.isShowEditor = true;
                this.isShowDetail = false;
                this.isShowMoreITs = false;

                var userId = sessionStorage.getItem("userId");
                if(!this.addoileUtil.validateReq(userId)){
                    this.$Notice.info({
                        desc: '<h3>Hi,您好,访客不允许下发表IT文章,登录后展现您真正的技术哦</h3>'
                    });
                }

            },
            //聚焦到编辑器
            onEditorFocus(editor) {
            },
            //发表IT文章
            sendITArticle(){
                //如果没有登录,禁止添加分享经历
                var userId = sessionStorage.getItem("userId");
                if(!this.addoileUtil.validateReq(userId)){
                    this.$Notice.info({
                        desc: '<h2>Hi,您好,访客不允许下发表IT文章</h2>'
                    });
                    return;
                }

                var itTitle = this.ITTitle;
                var itSubTitle = this.ITSubTitle;
                var itContent = this.ITContent;

                if(!this.addoileUtil.validateReq(itTitle) || !this.addoileUtil.validateReq(itContent)
                        || !this.addoileUtil.validateReq(itSubTitle)){
                    this.$Notice.warning({
                        desc: 'IT技术文章的标题、副标题或者内容为空'
                    });
                    return;
                }

                if(itTitle.length > 50){
                    this.$Message.warning("IT文章标题字数不能多余50个",3);
                    return;
                }


                if(itSubTitle.length > 70){
                    this.$Message.warning("IT文章副标题不能多余70个",3);
                    return;
                }


                //
                this.axios.post("addArticle",{
                    title : itTitle,
                    subTitle : itSubTitle,
                    content : itContent,
                    articleType : 2
                }).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data > 0){
                        this.$Notice.success({
                            desc: 'IT技术文章分享成功,2s后刷新本页面'
                        });
                        setTimeout(function () {
                            this.$router.go(0);
                        }.bind(this), 2000);
                        this.clearContent();
                    }
                }.bind(this));

            },
            //清空内容
            clearContent(){
                this.ITContent = '';
                this.ITTitle = '';
                this.ITSubTitle ='';
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            }
        },
        mounted () {
            //初始化文章列表 和 显示第一篇文章详情内容
            this.initITTech(null);
        }
    }
</script>