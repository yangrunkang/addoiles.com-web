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
        padding:7px
    }

    /*分享按钮*/
    .share-btn {
        width: 100%;
        margin-bottom: 10px;
        font-size: xx-large;
        text-align: center;
    }

    .p-left {
        text-align: left;
        margin-top: 7px;
        font-size: 15px;
    }

    .experience-list {
        margin-bottom: 10px;
    }

    .experience-list-title {
        font-size: 19px;
        color: black;
        font-weight: initial;
    }


</style>
<template>
    <div>
        <Affix :offset-top="5">
            <Button class="share-btn" type="info" size="large" @click="toShareExperience()">我要分享</Button>
        </Affix>
        <Alert show-icon>
            已分享列表
            <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
            <template slot="desc">不虚度人生,让自己的人生少点遗憾</template>
        </Alert>

        <div>
            <Card class="experience-list" v-for="experience in experienceList" :key="experience.id">
                <a class="experience-list-title auto-break-line" @click="getExperience(experience.id)">
                    {{experience.title}}
                </a>
                <p class="p-left">
                    <Icon type="calendar"></Icon>&nbsp;{{experience.createTime}}
                    &nbsp;&nbsp;&nbsp;
                    <Icon type="ios-speedometer-outline"></Icon>&nbsp;获得评分:{{experience.rates}}
                    &nbsp;&nbsp;&nbsp;
                    <Icon type="person"></Icon>&nbsp;{{experience.userName}}
                </p>
            </Card>
        </div>
        <Button type="info" size="large" long style="width: 100%;margin-top: 10px" :disabled="loadMoreBtnDisabled" @click="loadMore()">加载更多</Button>

        <!--具体经历的模态框-->
        <Modal v-model="showExperienceModal"
               width="1200px"
               :styles="{top: '20px'}"
               :closable="true"
        >
            <div slot="header">
                <p  style="height: inherit;font-size: 18px;font-weight: bold">
                    {{experienceDto.title}}
                </p>
            </div>
            <Row class="experience-content" :gutter="16" style="margin-bottom: 10px">
                <i-col span="18">
                    <!--具体的经历-->
                    <p v-html="experienceDto.content" class="web-content-font-size auto-break-line"></p> <!--显示html样式文本-->
                </i-col>
                <i-col span="6">
                    <Card style="margin-bottom: 10px">
                        <h4>文章信息:</h4>
                        <Tag type="border"  color="blue"><strong>作者:</strong>{{experienceDto.userName}}</Tag>
                        <Tag type="border"  color="green"><strong>发布时间:</strong>{{experienceDto.createTime}}</Tag>
                        <br />
                        <h4 v-show="experienceDto.isShowEditBtn">操作:</h4>
                        <div v-show="experienceDto.isShowEditBtn"><Button type="info" shape="circle" @click="toEditExperience(experienceDto.id)">编辑</Button></div>

                    </Card>

                    <Card>
                        <h2>感想+</h2>
                        <Input type="textarea" :rows="3" placeholder="写下你此刻想说的" v-model="commentContent" />
                        <Button type="success" long style="margin-top: 5px" @click="toComment(experienceDto.id)">评价</Button><!--experienceDto.id是experienceId-->
                        <Alert style="margin: 3px auto;">
                            <strong>评分:</strong>
                            <Rate v-model="experienceDto.rates" @on-change="toRates(experienceDto.id,$event)"></Rate>
                        </Alert>
                        <!--评论-->
                        <h2>评论</h2>
                        <div v-for="comment in experienceDto.commentList" :key="comment.id" style="margin-bottom: 3px">
                            <!--<Tag type="border" color="green">{{comment.createTime}}</Tag><Tag color="green">{{comment.userName}}</Tag>-->
                            {{comment.content}}
                            <p class="p-right">
                                <Icon type="person"></Icon>{{comment.userName}}
                            </p>
                            <p class="p-right">
                                <Icon type="calendar"></Icon>{{comment.createTime}}
                            </p>
                        </div>
                    </Card>
                </i-col>
            </Row>
            <div slot="footer">
                <p style="text-align: center;font-weight: bold">来自油站:不虚度人生,让自己的人生少点遗憾</p>
            </div>
        </Modal>

    </div>
</template>
<script>

    export default {
        data () {
            return {
                //加载更多按钮是否可用
                loadMoreBtnDisabled:false,
                //是否展示具体经历的模态框
                showExperienceModal:false,
                //评论内容
                commentContent:'',
                //经历列表
                experienceList:[],
                //具体的经历
                experienceDto:{},
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
            toComment(experienceId){

                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }

                let commentContent = this.commentContent;

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
                        this.experienceDto.commentList.unshift({
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
            /**
             * 获取经历列表
             */
            getExperienceList(){

                this.queryDto.articleType = 0;

                this.axios.post('getExperienceList',this.queryDto).then(function (response) {
                    if(response.data.code == 0){
                        let experienceList = response.data.data; //List<ExperienceDto>
                        if(experienceList.length > 0){
                            for(let i = 0; i < experienceList.length; i++){ //ExperienceDto
                                //经历
                                let experience = experienceList[i];
                                this.experienceList.push({
                                    //注意这里的id是articleId
                                    id:experience.articleId,
                                    userName:experience.userName,
                                    title:experience.title,
                                    rates:experience.rates,
                                    createTime:this.addoileUtil.formatUnixTime(experience.createTime),
                                });
                            }
                        }else{
                            this.loadMoreBtnDisabled = true;
                            this.$store.commit('loadAll',this);
                        }
                    }
                }.bind(this));
            },
            //获取具体经历
            getExperience(experienceId){

                this.experienceDto.title = "请稍等...客官~";
                this.experienceDto.content = "正在马不停蹄的从服务器上加载资源,请稍等";
                this.showExperienceModal = true;

                this.queryDto.businessId = experienceId;

                this.axios.post('getExperience',this.queryDto).then(function (response) {
                    if(response.data.code == 0){
                        // ExperienceDto
                        let _experienceDto = response.data.data;

                        //评论
                        let commentList = _experienceDto.commentList;
                        let _commentList = [];
                        if(commentList.length > 0){
                            for(let j = 0; j < commentList.length; j++){
                                let comment = commentList[j];
                                _commentList.push({
                                    createTime:this.addoileUtil.formatUnixTime(comment.createTime),
                                    userName:comment.userName,
                                    content:comment.content
                                });
                            }
                        }else{
                            _commentList.push({
                                createTime:"Now",
                                userName:"系统提示",
                                content:"本文暂无评论,你的机会来了,快在右边写下你的感想吧"});
                        }
                        //经历
                        let article = _experienceDto.article;
                        //当前用户id
                        let currentUserId = sessionStorage.getItem("userId");
                        this.experienceDto = {
                            //注意这里的id是articleId
                            id:article.articleId,
                            userName:article.userName,
                            title:article.title,
                            content:article.content,
                            rates:article.rates,
                            createTime:this.addoileUtil.formatUnixTime(article.createTime),
                            commentList:_commentList,
                            isShowEditBtn : this.addoileUtil.isCurrentUser(article.userId,currentUserId)
                        };
                    }else{
                        this.$store.commit('loadingFailed',this);
                        this.showExperienceModal = false;
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