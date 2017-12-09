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

    /*编辑器Div*/
    .editorDiv {
        width: 1440px;
        margin: 0 auto;
    }

    /*分享内容*/
    .experience-content {
        background:#eee;
        padding:20px
    }



</style>
<template>
    <div>

        <!--显示编辑器图钉-->
        <Affix :offset-top="10" v-show="showOnOffAffix">
            <span class="switch-affix"><h2 style="color: white">显示编辑器&nbsp;<i-switch size='large' @on-change="changeSwitch"><span slot='open'>显示</span><span slot='close'>关闭</span></i-switch></h2></span>
        </Affix>

        <!--未登录时展示-->
        <Alert type="error" class="not-login-tips" v-show="showNotLoginTips">
            请登录后分享经历
        </Alert>
        <!--编辑器-->
        <div class="editorDiv" v-show="isShowEditor">
            <Card class="edit-card">
                <p slot="title" style="height: auto;font-size: 18px">分享你的经历,不论是否精彩&nbsp;&nbsp;
                    <Poptip trigger="focus" title="要走心❤" content="不要走肾的">
                        <i-input v-model="experienceTitle" placeholder="给你的经历起个名字吧" size="large" style="width:605px;"></i-input>
                    </Poptip>
                    <span style="float: right;">
                        <Button type="info" shape="circle" v-show="editBtn" @click="editExperience()">编辑完成</Button>
                        <Button type="info" shape="circle" v-show="shareBtn" @click="saveExperience('normal')">发表</Button>
                        <Button type="warning" shape="circle" v-show="shareBtn" @click="saveExperience('draft')">保存为草稿</Button>
                        <Button type="error" shape="circle" @click="confirmModal = true">清空内容</Button>
                    </span>
                </p>
                <!--https://surmon-china.github.io/vue-quill-editor -->
                <quill-editor ref="myTextEditor"
                              v-model="content"
                              :options="editorOption"
                              class="quill-editor-style">
                </quill-editor>
            </Card>
        </div>

        <!--页面主体内容-->
        <div class="main-content">
            <Alert show-icon>
                已分享的经历列表
                <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
                <template slot="desc">不虚度人生,让自己的人生少点遗憾</template>
            </Alert>
            <!--经历-->
            <Row class="experience-content" :gutter="16" style="margin-bottom: 10px" v-for="(experience,index) in experienceDtoList" key="experience.id">
                <Col span="19">
                    <!--具体的经历-->
                    <Card :bordered="false" style="margin-bottom: 5px">
                        <p slot="title" class="auto-break-line" style="height: auto;font-size: 18px;">
                            {{experience.title}}
                            <Button type="info" shape="circle" style="float: right;" v-show="experience.isShowEditBtn" @click="toEditExperience(experience.id,experience.title,experience.content)">编辑</Button>
                        </p>
                        <p v-html="experience.content" class="auto-break-line"></p> <!--显示html样式文本-->
                    </Card>
                    <!--评论-->
                    <h2>评论</h2>
                    <Alert type="success" v-for="comment in experience.commentList" key="comment.id" style="margin: 3px auto;">
                        <Tag type="border" color="green">{{comment.createTime}}</Tag><Tag color="green">{{comment.userName}}</Tag>
                        {{comment.content}}
                    </Alert>
                </Col>
                <Col span="5">
                    <h2>感想+</h2>
                    <Input type="textarea" :rows="3" placeholder="写下你此刻想说的" v-model="commentContent[index]" />
                    <Button type="success" long style="margin-top: 5px" @click="toComment(experience.id,index)">评价</Button><!--experience.id是experienceId-->
                    <Alert style="margin: 3px auto;">
                        <strong>评分:</strong>
                        <Rate v-model="experience.rates" @on-change="toRates(experience.id,$event)"></Rate>
                    </Alert>
                    <Tag type="border"  color="blue"><strong>作者:</strong>{{experience.userName}}</Tag>
                    <Tag type="border"  color="green"><strong>发布时间:</strong>{{experience.createTime}}</Tag>
                </Col>
            </Row>
        </div>
        <!--写好的经历确认清空吗-->
        <Modal v-model="confirmModal">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>确定要清空吗?</span>
            </p>
            <div style="text-align:center;font-size: 18px">
                <p>如果你写了很多内容,慎重考虑一下.</p>
                <!--<p>或者可以保存为<strong style="color: #ff3300">草稿</strong>下一次可以继续编辑</p>-->
            </div>
            <div slot="footer">
                <Button type="info" size="large" long @click="saveExperience('normal')">立即分享</Button>
            </div>
            <div slot="footer" style="margin: 4px auto;">
                <Button type="warning" size="large" long @click="saveExperience('draft')">保存为草稿</Button>
            </div>
            <div slot="footer" style="margin: 4px auto;">
                <Button type="error" size="large" long @click="clearContent(true)">坚决删除</Button>
            </div>
        </Modal>
    </div>
</template>
<script>

    import Vue from 'vue';
    import Cookies from 'js-cookie';
    //安装vue-quill-editor富文本编辑器
    import VueQuillEditor from 'vue-quill-editor';
    Vue.use(VueQuillEditor);

    export default {
        data () {
            return {
                // 经历标题
                experienceTitle : '',
                // 经历内容
                content : '',
                //评论内容
                commentContent:[],
                //编辑器配置
                editorOption: {
                    // something to config
                    placeholder: '不放弃,不抛弃,追梦之路,时常伴随着孤单\n分享自己不一样的经历,同大家一起加油共勉\n如果可以,请在这里书写您独一无二的人生经历'

                },
                //默认不显示编辑器
                isShowEditor : false,
                //确认清除模态框显示与隐藏
                confirmModal : false,
                //经历 + 评论
                experienceDtoList:[],
                //列表页是否显示编辑按钮
                isShowEditBtn : false,
                //未登录分享经历时提示
                showNotLoginTips: false,
                //默认显示分享和保存为草稿按钮,编辑时不显示
                shareBtn: true,
                //默认编辑按钮不显示
                editBtn:false,
                //是否显示 打开编辑器的图钉(编辑文章时不显示)
                showOnOffAffix:true
            }
        },
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            changeSwitch(status){
                //只要是点击了开启编辑器的按钮
                this.editBtn = false;
                this.shareBtn = true;

                if(status){
                    //清空内容
                    this.clearExperienceTitleContent();

                    this.isShowEditor = true;
                    let userId = sessionStorage.getItem("userId");
                    if(!this.addoileUtil.validateReq(userId)){
                        this.showNotLoginTips = true;
                    }
                }else if(!status){
                    this.isShowEditor = false;
                    this.showNotLoginTips = false;
                }
            },
            //删除内容
            clearContent(showNotice){
                if(!this.addoileUtil.validateReq(this.experienceTitle) && !this.addoileUtil.validateReq(this.content)){
                    //关闭模态框
                    this.confirmModal = false;
                    this.$Notice.info({
                        desc: '您还没写任何东西呢(=@__@=)'
                    });
                    return;
                }
                //清空标题和内容
                this.clearExperienceTitleContent();
                //关闭模态框
                this.confirmModal = false;
                //
                if(!showNotice) return;
                this.$Notice.success({
                    desc: '遵照您的旨意,已经把内容清空'
                });
            },
            clearExperienceTitleContent(){
                //清空内容
                this.experienceTitle = '';
                this.content = '';
            },
            saveExperience(operation){

                //如果没有登录,禁止添加分享经历
                let userId = sessionStorage.getItem("userId");
                if(!this.addoileUtil.validateReq(userId)){
                    this.$Notice.info({
                        desc: '<h6>Hi,您好,访客不允许添加分享经历</h6>'
                    });
                    return;
                }

                // 请求对象
                let deleteStatus = 0;
                if(operation == 'normal'){
                    deleteStatus = 0;
                }else if(operation == 'draft'){
                    deleteStatus = 2;
                }else{
                    this.$Notice.error({desc: '不好意思,程序员失误了'});
                }
                //关闭模态框
                this.confirmModal = false;

                //数据校验
                let experienceTitle = this.experienceTitle;
                let experienceContent = this.content;
                if(!this.addoileUtil.validateReq(experienceTitle) || !this.addoileUtil.validateReq(experienceContent)){
                    this.$Notice.warning({
                        desc: '经历标题或内容为空'
                    });
                    return;
                }

                if(experienceTitle.length > 50){
                    this.$Message.warning("经历标题字数不能多余50个",3);
                    return;
                }

                //调用服务端接口
                this.axios.post("addExperience",{
                    userId,userId,
                    title : experienceTitle,
                    content : experienceContent,
                    deleteStatus : deleteStatus
                }).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data == 1){
                        if(operation == 'normal'){
                            this.$Notice.success({
                                desc: '经历已经分享,2s后刷新本页面'
                            });
                        }else if(operation == 'draft'){
                            this.$Notice.info({
                                desc: '经历已经保存为草稿'
                            });
                        }
                        setTimeout(function () {
                            this.$router.go(0);
                        }.bind(this), 2000);
                        //清空内容
                        this.clearContent(false);
                    }
                }.bind(this));
            },
            /*去评论*/
            toComment(experienceId,index){

                //如果没有登录,禁止评论
                let userId = sessionStorage.getItem("userId");
                if(!this.addoileUtil.validateReq(userId)){
                    this.$Notice.info({
                        title: '<h6>Hi,您好,访客不允许评论</h6>'
                    });
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
                let rate = $event;
                this.$Notice.success({
                    title : '感谢您的评分',
                    desc : '系统将根据平局值显示结果'
                });
                this.axios.post("updateRates",{
                    experienceId:experienceId,
                    rate:rate
                }).then(function (response) {
                    //nothing
                })
            },
            //获取经历
            getExperienceList(){
                this.axios.get('getExperienceList').then(function (response) {
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
                                let experience = experienceDto.experience;
                                //当前用户id
                                let currentUserId = sessionStorage.getItem("userId");
                                this.experienceDtoList.push(
                                        {
                                            id:experience.experienceId, //注意这里的id是experienceId
                                            userName:experience.userName,
                                            title:experience.title,
                                            content:experience.content,
                                            rates:experience.rates,
                                            createTime:this.addoileUtil.formatUnixTime(experience.createTime),
                                            commentList:_commentList,
                                            isShowEditBtn : this.addoileUtil.isCurrentUser(experience.userId,currentUserId)
                                        });
                            }
                        }
                    }
                }.bind(this));
            },
            /**
             * 去编辑
             * @param experienceId 经历id
             * @param experienceTitle 经历标题
             * @param experienceContent 经历内容
             */
            toEditExperience(experienceId, experienceTitle, experienceContent){
                // this.$router.push("/Edit");
                this.isShowEditor = true;
                this.shareBtn = false;
                this.editBtn = true;
                this.showOnOffAffix = false;

                //承载编辑器的Card下调20px
                document.getElementsByClassName("edit-card")[0].setAttribute('style','height: 1047px;margin-top:20px');
                //回到顶部
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;

                this.experienceTitle = experienceTitle;
                this.content = experienceContent;
                //
                Cookies.set('editExperienceId',experienceId);
            },
            /**
             * 编辑完成
             */
            editExperience(){
                //如果没有登录,禁止添加分享经历
                let userId = sessionStorage.getItem("userId");

                /* 按理说,只有登录后才有这个入口
                if(!this.addoileUtil.validateReq(userId)){
                    this.$Notice.info({
                        desc: '<h2>Hi,您好,访客不允许添加分享经历</h2>'
                    });
                    return;
                }
                */

                if(!this.addoileUtil.validateReq(userId)){
                    return;
                }
                let editExperienceId = Cookies.get('editExperienceId');
                if(!this.addoileUtil.validateReq(editExperienceId)){
                    return;
                }
                
                //关闭模态框
                this.confirmModal = false;

                //数据校验
                let experienceTitle = this.experienceTitle;
                let experienceContent = this.content;
                if(!this.addoileUtil.validateReq(experienceTitle) || !this.addoileUtil.validateReq(experienceContent)){
                    this.$Notice.warning({
                        desc: '经历标题或内容为空'
                    });
                    return;
                }

                if(experienceTitle.length > 50){
                    this.$Message.warning("经历标题字数不能多余50个",3);
                    return;
                }

                //调用服务端接口
                this.axios.post("editExperience",{
                    experienceId:editExperienceId,
                    title : experienceTitle,
                    content : experienceContent
                }).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data == 1){
                        this.$Notice.success({
                            desc: '编辑完成,2s后刷新本页面'
                        });
                        setTimeout(function () {
                            this.$router.go(0);
                        }.bind(this), 2000);
                        //清空内容
                        this.clearContent(false); // TODO 其实刷新完了,就自动清除了
                        //清空Cookies
                        Cookies.remove('editExperienceId');
                    }
                }.bind(this));
            }

        },
        // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，
        // 实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            }
        },
        mounted() {
            this.getExperienceList();

        }
    }

</script>