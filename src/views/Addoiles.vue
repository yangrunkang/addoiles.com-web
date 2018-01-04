<style scoped lang="less">
    @import "../styles/common.css";
    /*栅格布局行*/
    .row {
        height: inherit;
        width: inherit;
    }

    /*栅格布局列*/
    .main-col {
        height: inherit;
    }

    /*图片轮播div*/
    .play-pics {
        margin: 0px 0px 10px 10px;
    }

    /*图片轮播图片img大小 就安这个截图*/
    .pic-style{
        height: 400px;
        width: 813px;
    }

    /*热门动弹div*/
    .hot-msg {
        margin: 0px 0px 10px 10px;
    }

    #cycle-pics {
        width: 100%;
        height: fit-content;
    }

    #qa {
        width: 100%;
        height: fit-content;
        margin-top: 10px;
    }

    /*问题提问 用户名和创建时间*/
    .p-right {
        text-align: right;
        color: rgba(91, 106, 97, 0.45);
        padding-right: 7px;
    }

    /*提问-回答列表div*/
    .qa-list-div {
        font-size: 18px;
        border-left:4px solid #1da1f2;
        margin-top: 5px;
        border-radius: 4px;
        background-color: #E8F5FD;
    }

    /*提问-回答内容*/
    .qa-content {
        font-size: 18px;
        text-indent: 8px;
        padding-left: 7px;
    }
</style>
<template>
    <div>
        <Row class="row">
            <i-col span="18" class="main-col">
                <div id="cycle-pics">
                    <Card style="width:100%;background-color: white;border: none">
                        <div class="play-pics">
                            <Carousel
                                    v-model="value3"
                                    :autoplay="setting.autoplay"
                                    :autoplay-speed="setting.autoplaySpeed"
                                    :dots="setting.dots"
                                    :trigger="setting.trigger"
                                    @on-change="picChange"
                                    :arrow="setting.arrow">
                                <Carousel-item>
                                    <div class="carousel" style="">
                                        <img class="pic-style" src="../images/index3.png">
                                    </div>
                                </Carousel-item>
                                <Carousel-item>
                                    <div class="carousel">
                                        <img  class="pic-style"  src="../images/index0.png">
                                    </div>
                                </Carousel-item>
                                <Carousel-item>
                                    <div class="carousel">
                                        <img  class="pic-style" src="../images/index1.png">
                                    </div>
                                </Carousel-item>
                                <Carousel-item>
                                    <div class="carousel">
                                        <img  class="pic-style" src="../images/index2.png">
                                    </div>
                                </Carousel-item>
                            </Carousel>
                        </div>
                        <p style="text-align: center">
                            {{picName}}
                        </p>
                    </Card>
                </div>

                <!--问答区域-->
                <div id="qa">
                    <Card style="width:100%;background-color: white;border: none" >
                        <!--提问-->
                        <div style="text-align:center">
                            <img src="../images/question.png" style="width: 100%;height: 200px">
                            <h1>你敢提问吗</h1>
                            <h3>爱情,八卦,故事,亲情,笑话等等</h3>
                        </div>
                        <p style="text-align: center;margin-top: 1%">
                            <Input  type="textarea" :rows="6" size="large" placeholder="随意提问区(新闻,八卦,火星······只要你能想的到)" v-model="question" style="width: 100%" />
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

                </div>
            <Button type="info" size="large" long style="width: 100%;margin-top: 10px" @click="loadMore()">加载更多</Button>
            </i-col>
            <i-col span="6" class="main-col">
                <div class="hot-msg">
                    <h2>热门动弹</h2>
                    <Card :bordered="true" >
                        <Button type="success" long style="margin-bottom: 5px" @click="addHots">发表动弹</Button>

                        <p>
                            <Input placeholder="热点标题" style="margin-bottom: 5px" v-model="hotTitle"/>
                            <Input type="textarea" :rows="4" placeholder="热门描述" v-model="hotContent"/>
                        </p>
                    </Card>
                    <br />

                    <Card :bordered="true" style="margin-top: 6px"  v-for="item in hotsList" :key="item.id">
                        <p slot="title" class="auto-break-line">
                            {{ item.title }}
                        </p>
                        <p class="auto-break-line">{{ item.content }}</p>
                    </Card>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value3: 0,
                setting: {
                    autoplay: true,
                    autoplaySpeed: 2500,
                    dots: 'inside',
                    trigger: 'click',
                    arrow: 'hover'
                },
                //图片简洁
                picName : '该图无简介',
                //热门列表
                hotsList:[],
                //热门标题
                hotTitle : '',
                //热门内容
                hotContent : '',
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
            //初始化热门动弹
            initHots(){


                this.queryDto.microType = 0;
                this.queryDto.pageNo = 0;
                this.queryDto.pageSize = 10;

                this.axios.post('getMicroContentList',this.queryDto).then(function (res) {
                    if(res.data.code == 0){
                        let resp = res.data.data;
                        for(let i =0 ;i<resp.length ; i++){
                            this.hotsList.push({title : resp[i].title , content : resp[i].content,id:resp[i].id});
                        }
                    }
                }.bind(this));
            },
            //发表热门
            addHots(){
                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }

                let hotTitle = this.hotTitle;
                let hotContent = this.hotContent;
                if(!this.addoileUtil.validateReq(hotTitle) || !this.addoileUtil.validateReq(hotContent)){
                    this.$Message.warning("热门标题或者内容不能空",3);
                    return;
                }

                if(hotTitle.length > 32){
                    this.$Message.warning("动弹标题字数不能多余32个",3);
                    return;
                }

                if(hotContent.length > 50){
                    this.$Message.warning("动弹内容字数不能多余50个",3);
                    return;
                }
                this.axios.post('addMicroContent',{
                    title:hotTitle,
                    content:hotContent,
                    userId:userId,
                    microType:0
                }).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data > 0){
                        this.$Notice.info({
                            title: '<h3>动弹成功</h3>'
                        });
                        this.hotsList.unshift({title : hotTitle , content : hotContent});
                        //清空数据
                        this.hotTitle = '';
                        this.hotContent = '';
                    }else{
                        this.$Notice.warning({
                            title: '<h3>动弹失败</h3>'
                        });
                    }
                }.bind(this));

            },
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
            picChange($event){
                let index = $event;
                if(index == 0){
                    this.picName = '长大才知道,童年的时光总是美好的';
                }else if(index == 1){
                    this.picName = '人生的路你会如何选择?';
                }else if(index == 2){
                    this.picName = '美';
                }else if(index == 3){
                    this.picName = '梦想不休不止,Do it!';
                }

            },
            //初始化问题区域
            initQuestionAnswer(){

                let queryDto = this.$store.getters.getQueryDto;

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
            this.initHots();
            this.initQuestionAnswer();
        }
    }
</script>