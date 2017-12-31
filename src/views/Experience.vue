<style scoped lang="less">
    @import "../styles/common.css";

    /*在main-content之外再嵌套一层*/
    .experience {
        width: inherit;
        height: inherit;
    }

    /*页面图钉*/
    .switch-affix {
        margin-top: 10px;
        margin-bottom: 10px;
        display: inline-block;
        color: #fff;
        padding: 10px 30px;
        text-align: center;
        background: rgba(0,153,229,.9);
        border-radius: 32px;
    }

    /*分享内容*/
    .experience-content {
        background:#eee;
        padding:20px
    }

    /*分享按钮*/
    .share-btn {
        width: 100%;
        margin-bottom: 10px;
        font-size: xx-large;
        text-align: center;
    }
</style>
<template>
    <div>
        <Button class="share-btn" type="info" size="large" @click="toShareExperience()">我要分享</Button>
        <Alert show-icon>
            已分享的经历列表
            <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
            <template slot="desc">不虚度人生,让自己的人生少点遗憾</template>
        </Alert>
        <!--经历-->
        <Row class="experience-content" :gutter="16" style="margin-bottom: 10px" v-for="(experience,index) in experienceDtoList" :key="experience.id">
            <i-col span="19">
                <!--具体的经历-->
                <Card :bordered="false" style="margin-bottom: 5px">
                    <p slot="title" class="auto-break-line" style="height: auto;font-size: 18px;">
                        {{experience.title}}
                        <Button type="info" shape="circle" style="float: right;" v-show="experience.isShowEditBtn" @click="toEditExperience(experience.id)">编辑</Button>
                    </p>
                    <p v-html="experience.content" class="auto-break-line"></p> <!--显示html样式文本-->
                </Card>
                <!--评论-->
                <h2>评论</h2>
                <Alert type="success" v-for="comment in experience.commentList" :key="comment.id" style="margin: 3px auto;">
                    <Tag type="border" color="green">{{comment.createTime}}</Tag><Tag color="green">{{comment.userName}}</Tag>
                    {{comment.content}}
                </Alert>
            </i-col>
            <i-col span="5">
                <h2>感想+</h2>
                <Input type="textarea" :rows="3" placeholder="写下你此刻想说的" v-model="commentContent[index]" />
                <Button type="success" long style="margin-top: 5px" @click="toComment(experience.id,index)">评价</Button><!--experience.id是experienceId-->
                <Alert style="margin: 3px auto;">
                    <strong>评分:</strong>
                    <Rate v-model="experience.rates" @on-change="toRates(experience.id,$event)"></Rate>
                </Alert>
                <Tag type="border"  color="blue"><strong>作者:</strong>{{experience.userName}}</Tag>
                <Tag type="border"  color="green"><strong>发布时间:</strong>{{experience.createTime}}</Tag>
            </i-col>
        </Row>
        <Button type="info" size="large" long style="width: 100%;margin-top: 10px" @click="loadMore()">加载更多</Button>
    </div>
</template>
<script>

    import Vue from 'vue';
    import Cookies from 'js-cookie';

    export default {
        data () {
            return {
                // 经历标题
                experienceTitle : '',
                // 经历内容
                content : '',
                //评论内容
                commentContent:[],
                //经历 + 评论
                experienceDtoList:[],
                //列表页是否显示编辑按钮
                isShowEditBtn : false,
                //页面查询基础Dto
                queryDto : {
                    page : {
                        pageNo: 0,
                        pageSize: 10
                    }
                }
            }
        },
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            /*去分享*/
            toShareExperience(){

                this.$store.commit('validateLogin',this);

                let editObj = {
                    articleType:0,
                };

                sessionStorage.setItem("editObj",JSON.stringify(editObj));

                this.$router.push("/OilEditor");
            },
            /*去评论*/
            toComment(experienceId,index){

                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }

                let commentContent = this.commentContent[index];

                if(!this.addoileUtil.validateReq(commentContent)){
                    this.$Notice.info({
                        desc: '评论内容为空'
                    });
                    return;
                }

                if(commentContent.length > 100){
                    this.$Message.warning("感想字数不能多余100个",3);
                    return;
                }

                //请求后台
                this.axios.post('addComment',{
                    userId : userId,
                    targetId : experienceId,
                    content : commentContent
                }).then(function (res) {
                    let response = res.data;
                    if(response.code == 0 && response.data == 1){
                        //弹窗提示
                        this.$Notice.success({
                            title: '<h6>评论成功</h6>'
                        });
                        //显示评论信息
                        this.experienceDtoList[index].commentList.unshift({
                            createTime:'刚刚',
                            userName:'我',
                            content:commentContent
                        });
                        //清空数据
                        this.commentContent[index] = '';
                    }else{
                        this.$Notice.info({
                            title: '<h6>系统出错了,抱歉</h6>'
                        });
                    }
                }.bind(this));

            },
            //去评分
            toRates(experienceId,$event){
                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }

                let rate = $event;
                this.$Notice.success({
                    title : '感谢您的评分',
                    desc : '系统将根据平局值显示结果'
                });

                let rateDto = {
                  businessId:experienceId,
                  rate:rate
                };

                this.axios.post("updateRates",rateDto).then(function (response) {
                    //nothing
                })
            },
            //获取经历
            getExperienceList(){

                this.queryDto.articleType = 0;

                this.axios.post('getExperienceList',this.queryDto).then(function (response) {
                    if(response.data.code == 0){
                        let experienceDtoList = response.data.data; //List<ExperienceDto>
                        if(experienceDtoList.length >= 0){

                            for(let i = 0; i < experienceDtoList.length; i++){ //ExperienceDto
                                let experienceDto = experienceDtoList[i];
                                //评论
                                let commentList = experienceDto.commentList;
                                let _commentList = [];
                                if(commentList.length > 0){
                                    for(let j = 0; j < commentList.length; j++){
                                        let comment = commentList[j];
                                        _commentList.push(
                                                {
                                                    createTime:this.addoileUtil.formatUnixTime(comment.createTime),
                                                    userName:comment.userName,
                                                    content:comment.content
                                                }
                                        );
                                    }
                                }else{
                                    _commentList.push({
                                        createTime:"Now",
                                        userName:"系统提示",
                                        content:"本文暂无评论,你的机会来了,快在右边写下你的感想吧"});
                                }
                                //经历
                                let article = experienceDto.article;
                                //当前用户id
                                let currentUserId = sessionStorage.getItem("userId");
                                this.experienceDtoList.push(
                                        {
                                            id:article.articleId, //注意这里的id是articleId
                                            userName:article.userName,
                                            title:article.title,
                                            content:article.content,
                                            rates:article.rates,
                                            createTime:this.addoileUtil.formatUnixTime(article.createTime),
                                            commentList:_commentList,
                                            isShowEditBtn : this.addoileUtil.isCurrentUser(article.userId,currentUserId)
                                        });
                            }
                        }
                    }
                }.bind(this));
            },
            /**
             * 去编辑
             * @param experienceId 经历id
             */
            toEditExperience(experienceId){

                let editObj = {
                    businessId:experienceId,
                };

                sessionStorage.setItem("editObj",JSON.stringify(editObj));

                this.$router.push("/OilEditor");

            },

            loadMore(){
                this.queryDto.page.pageNo += this.queryDto.page.pageSize;
                this.getExperienceList();
            }

        },

        mounted() {
            this.getExperienceList();
        }
    }

</script>