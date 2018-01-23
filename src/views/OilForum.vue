<style scoped lang="less">
    @import "../styles/common.css";

    #qa {
        width: 100%;
        height: fit-content;
    }

    /*提问-回答列表div*/
    .qa-list-div {
        font-size: 14px;
        border-left:4px solid rgb(220, 230, 240);
        margin-top: 5px;
        border-radius: 4px;
        background-color: rgb(242, 247, 251);
    }

    /*提问-回答内容*/
    .qa-content {
        text-indent: 8px;
        padding-left: 7px;
    }

    /*问答区-右边部分*/
    .qa-area-right {
        width:81%;
        height: 100%;
        border: none;
        margin:35px auto auto 45px;
    }
</style>
<template>
    <div>
        <Row class="row">
            <i-col span="18" class="main-col">
                <!--问答区域-->
                <div id="qa">
                    <Card style="width:100%;background-color: white;" shadow>
                        <!--提问-->
                        <div style="text-align:center">
                            <img src="../images/question.png" style="width: 100%;height: 200px">
                            <h1>提问是门艺术</h1>
                            <h3>爱情,八卦,故事,亲情,笑话等等</h3>
                        </div>
                        <p style="text-align: center;margin-top: 1%">
                            <Input  type="textarea" :rows="6" size="large" :placeholder="inputTypeDesc" v-model="question" style="width: 100%" />
                            <Button type="info" size="large" long  style="width: 100%;margin-top: 10px" @click="askQuestion" >我要提问</Button>
                        </p>
                    </Card>
                    <!--解答-->
                    <Card style="width:100%;background-color: white;border: none;margin-top: 6px"
                          v-for="(questionAnswer,index) in questionAnswerList" :key="questionAnswer.id">
                        <!--最新问题-->
                        <h2>最新问题{{index + 1}}</h2>
                        <div>
                            <!--具体的问题-->
                            <div class="qa-list-div">
                                <p class="qa-content web-content-font-size"><Icon type="pound"></Icon>&nbsp;&nbsp;{{questionAnswer.question.content}}</p>
                                <p class="p-right"><Icon type="person"></Icon>{{questionAnswer.question.userName}}</p>
                                <p class="p-right">{{questionAnswer.question.createTime}}</p>
                            </div>
                            <h2>回答</h2>
                            <div>
                                <i-input style="margin-top: 6px" placeholder="我要回答" v-model="answerContent[index]">
                                    <Button slot="append" icon="compose" @click="toAnswer(questionAnswer.question.questionId,index)"></Button>
                                </i-input>
                            </div>
                            <div class="qa-list-div" v-for="answer in questionAnswer.answerList" :key="answer.id">
                                <p class="qa-content web-content-font-size"><Icon type="quote"></Icon>&nbsp;&nbsp;{{answer.content}}</p>
                                <p class="p-right"><Icon type="person"></Icon>{{answer.userName}}</p>
                                <p class="p-right">{{answer.createTime}}</p>
                            </div>
                        </div>
                    </Card>
                    <Button type="info" size="large" long style="width: 100%;margin-top: 10px" :disabled="loadMoreBtnDisabled" @click="loadMore()">加载更多</Button>
                </div>
            </i-col>
            <i-col span="6" class="main-col">
                <div class="qa-area-right">
                    <Row><i-col><Button type="info" shape="circle" long @click="toQuestionType(0)">编程语言</Button></i-col></Row>
                    <br/>
                    <Row><i-col><Button type="primary" shape="circle" long @click="toQuestionType(1)">开发问题</Button></i-col></Row>
                    <br/>
                    <Row><i-col><Button type="success" shape="circle" long @click="toQuestionType(2)">缓存技术</Button></i-col></Row>
                    <br/>
                    <Row><i-col><Button type="info" shape="circle" long @click="toQuestionType(3)">操作系统</Button></i-col></Row>
                    <br/>
                    <Row><i-col><Button type="ghost" shape="circle" long @click="toQuestionType(4)">学习</Button></i-col></Row>
                    <!--<br/>-->
                    <!--<Row><i-col><Button type="warning" shape="circle" long @click="initQuestionAnswer(5)">八卦</Button></i-col></Row>-->
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
                //问题
                question : '',
                //提问时,问题类型的placeholder
                inputTypeDesc:'',
                //用户回答的内容(使用数组然后通过index区别)
                answerContent : [],
                //问题&答案List
                questionAnswerList : [],
                //页面查询基础Dto
                queryDto : {
                    page : {
                        pageNo: 0,
                        pageSize: 10
                    },
                    questionType:0
                }
            }
        },
        methods: {
            //提问
            askQuestion(){

                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }
                let questionContent = this.question;

                if(!this.addoileUtil.validateReq(questionContent)){
                    this.$Message.warning("问题不能为空");
                    return;
                }

                if(questionContent.length > 3000){
                    this.$Message.warning("问题内容字数不能多于3000");
                    return;
                }

                this.axios.post("addQuestion",{
                    type : this.queryDto.questionType,
                    content : questionContent,
                    userId : userId
                }).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data > 0){
                        this.$Notice.success({
                            desc: '已经提问,2s后刷新本页面'
                        });
                        this.clearContent();
                        setTimeout(function () {
                            this.$router.go(0);
                        }.bind(this), 2000);
                    }
                }.bind(this));


            },
            //回答问题
            toAnswer(questionId,index){
                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }

                let answerContent = this.answerContent[index];


                if(!this.addoileUtil.validateReq(answerContent)){
                    this.$Message.warning("回答内容不能为空");
                    return;
                }

                if(answerContent.length > 100){
                    this.$Message.warning("回答内容字数不能多于100个");
                    return;
                }

                this.axios.post("addComment",{
                    userId:userId,
                    targetId:questionId,
                    content:answerContent
                }).then(function (res) {
                    let response = res.data;
                    if(response.code == 0 && response.data == 1){
                        //弹窗提示
                        this.$Notice.success({
                            title: '<h6>回答成功</h6>'
                        });
                        this.questionAnswerList[index].answerList.unshift(
                                {
                                    userName:'我',
                                    createTime:'刚刚',
                                    content : answerContent
                                }
                        );
                        this.clearContent();
                    }

                }.bind(this));

            },
            /**
             * 切换不同的类型
             *  之前重复点击某一类型会追加list,解决不了,就重新封装了一层
             * */
            toQuestionType(questionType){

                this.clearContent();

                this.inputTypeDesc = this.addoileUtil.getInputTypePlaceHolder(questionType);

                this.questionAnswerList = [];
                this.queryDto = {
                    page : {
                        pageNo: 0,
                        pageSize: 10
                    }
                };
                this.queryDto.questionType = questionType;

                this.initQuestionAnswer()
            },
            //初始化问题区域
            initQuestionAnswer(){
                this.axios.post("getQuestionAnswerList",this.queryDto).then(function (resp) {
                    if(resp.data.code == 0){
                        let questionAnswerDtoList = resp.data.data;
                        if(questionAnswerDtoList.length > 0){
                            for(let i = 0;i < questionAnswerDtoList.length; i++){
                                let questionAnswerDto = questionAnswerDtoList[i];

                                let question = questionAnswerDto.question;

                                let answerList = [];
                                answerList = questionAnswerDto.answerList;

                                let _answerList = [];
                                for(let j = 0; j < answerList.length; j++){
                                    let _answer = answerList[j];
                                    _answerList.push({
                                        userName:_answer.userName,
                                        createTime:this.addoileUtil.formatUnixTime(_answer.createTime),
                                        content : _answer.content});
                                }

                                this.questionAnswerList.push({
                                    question : {
                                        userName:question.userName,
                                        createTime:this.addoileUtil.formatUnixTime(question.createTime),
                                        content : question.content,
                                        questionId:question.questionId
                                    },
                                    answerList : _answerList
                                });

                            }
                        }else{
                            this.loadMoreBtnDisabled = true;
                            this.$store.commit('loadAll',this);
                        }
                    }
                }.bind(this));
            },
            loadMore(){
                this.queryDto.page.pageNo += this.queryDto.page.pageSize;
                this.initQuestionAnswer();
            },
            clearContent(){
                this.question = '';
                this.answerContent = [];
            }
        },
        mounted() {
            this.initQuestionAnswer();
        }
    }
</script>