<style scoped lang="less">
    @import "../styles/common.css";

    #qa {
        width: 100%;
        height: fit-content;
    }

    /*问题提问 用户名和创建时间*/
    .p-right {
        text-align: right;
        color: rgba(91, 106, 97, 0.45);
        padding-right: 7px;
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
        font-size: 16px;
        text-indent: 8px;
        padding-left: 7px;
    }

    /*问答区-右边部分*/
    .qa-area-right {
        width:81%;
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
                    <Card style="width:100%;background-color: white;border: none" >
                        <!--提问-->
                        <div style="text-align:center">
                            <img src="../images/question.png" style="width: 100%;height: 200px">
                            <h1>提问是门艺术</h1>
                            <h3>爱情,八卦,故事,亲情,笑话等等</h3>
                        </div>
                        <p style="text-align: center;margin-top: 1%">
                            <Input  type="textarea" :rows="6" size="large" placeholder="随意提问区(新闻,八卦,火星······只要你能想的到)" v-model="question" style="width: 100%" />
                            <Button type="info" size="large" long  style="width: 100%;margin-top: 10px" @click="askQuestion" >我要提问</Button>
                        </p>
                        <!--解答-->
                        <Card style="width:100%;background-color: white;border: none;margin-top: 6px"
                              v-for="(questionAnswer,index) in questionAnswerList" :key="questionAnswer.id">
                            <!--最新问题-->
                            <h2>最新问题{{index + 1}}</h2>
                            <div>
                                <!--具体的问题-->
                                <div class="qa-list-div">
                                    <p class="qa-content"><Icon type="pound"></Icon>&nbsp;&nbsp;{{questionAnswer.question.content}}</p>
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
                                    <p class="qa-content"><Icon type="quote"></Icon>&nbsp;&nbsp;{{answer.content}}</p>
                                    <p class="p-right"><Icon type="person"></Icon>{{answer.userName}}</p>
                                    <p class="p-right">{{answer.createTime}}</p>
                                </div>
                            </div>
                        </Card>
                    </Card>
                    <Button type="info" size="large" long style="width: 100%;margin-top: 10px" @click="loadMore()">加载更多</Button>
                </div>
            </i-col>
            <i-col span="6" class="main-col">
                <div class="qa-area-right">
                    <Row><i-col><Button type="info" shape="circle" long>编程语言</Button></i-col></Row>
                    <br/>
                    <Row><i-col><Button type="primary" shape="circle" long>开发问题</Button></i-col></Row>
                    <br/>
                    <Row><i-col><Button type="success" shape="circle" long>缓存技术</Button></i-col></Row>
                    <br/>
                    <Row><i-col><Button type="info" shape="circle" long>操作系统</Button></i-col></Row>
                    <br/>
                    <Row><i-col><Button type="ghost" shape="circle" long>学习</Button></i-col></Row>
                    <br/>
                    <Row><i-col><Button type="warning" shape="circle" long>八卦</Button></i-col></Row>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                //问题
                question : '',
                //用户回答的内容(使用数组然后通过index区别)
                answerContent : [],
                //问题&答案List
                questionAnswerList : [],
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
                    content : questionContent,
                    userId : userId
                }).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data > 0){
                        this.$Notice.success({
                            desc: '已经提问,2s后刷新本页面'
                        });
                        this.question = '';
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
                        this.answerContent[index] = '';
                    }

                }.bind(this));

            },
            //初始化问题区域
            initQuestionAnswer(){

                this.axios.post("getQuestionAnswerList",this.queryDto).then(function (resp) {
                    if(resp.data.code == 0){
                        let questionAnswerDtoList = resp.data.data;
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

                    }
                }.bind(this));


            },
            loadMore(){
                this.queryDto.page.pageNo += this.queryDto.page.pageSize;
                this.initQuestionAnswer();
            }
        },
        mounted() {
            this.initQuestionAnswer();
        }
    }
</script>