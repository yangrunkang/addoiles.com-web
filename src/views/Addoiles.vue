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

    /*图片轮播图片div大小*/
    .carousel{
        height: 400px;
        width: inherit;
    }

    /*热门动弹div*/
    .hot-msg {
        margin: 0px 0px 10px 10px;
    }

    #cycle-pics {
        width: 100%;
        height: fit-content;
    }

    #QA {
        width: 100%;
        height: fit-content;
        margin-top: 10px;
    }

</style>
<template>
    <div class="main-content">
        <Row class="row">
            <Col span="18" class="main-col">
                <div id="cycle-pics">
                    <Card style="width:100%;background-color: white;border: none">
                        <div class="play-pics">
                            <Carousel
                                    v-model="value3"
                                    :autoplay="setting.autoplay"
                                    :autoplay-speed="setting.autoplaySpeed"
                                    :dots="setting.dots"
                                    :trigger="setting.trigger"
                                    :arrow="setting.arrow">
                                <Carousel-item>
                                    <div class="carousel">
                                        <img src="../images/test.png">
                                    </div>
                                </Carousel-item>
                                <Carousel-item>
                                    <div class="carousel">
                                        <img src="../images/one.png">
                                    </div>
                                </Carousel-item>
                                <Carousel-item>
                                    <div class="carousel">
                                        <img src="../images/two.png">
                                    </div>
                                </Carousel-item>
                                <Carousel-item>
                                    <div class="carousel">
                                        <img src="../images/three.png">
                                    </div>
                                </Carousel-item>
                            </Carousel>
                        </div>
                        <p style="text-align: center">
                            说明
                        </p>
                    </Card>
                </div>

                <!--问答区域-->
                <div id="QA">
                    <Card style="width:100%;background-color: white;border: none" >
                        <!--提问-->
                        <div style="text-align:center">
                            <img src="../images/two.png" style="width: 100%;height: 200px">
                            <h1>你敢提问吗</h1>
                            <h3>爱情,八卦,故事,亲情,笑话等等</h3>
                        </div>
                        <p style="text-align: center;margin-top: 1%">
                            <Input  type="textarea" :rows="6" size="large" placeholder="随意提问区(新闻,八卦,火星······只要你能想的到)" style="width: 100%" />
                            <Button type="info" size="large" long  style="width: 100%;margin-top: 10px" >我要提问</Button>
                        </p>

                        <!--解答-->
                        <Card style="width:100%;background-color: white;border: none;margin-top: 6px">
                            <!--最新问题-->
                            <h1>问题1</h1>
                            <div>
                                <!--具体的问题-->
                                <Card style="width:100%;background-color:transparent;">
                                    <Row>
                                        <Col span="5">
                                        <p><Tag type="dot" color="blue" style="width:95%;">请问,明天上班吗</Tag></p>
                                        <p  style="margin-top: 8px"><Tag style="width:95%;" type="dot" color="blue">2019-08-09</Tag></p>
                                        </Col>
                                        <Col span="19" style="text-align: left"> 请问,明天上班吗
                                        请问,明天上班吗
                                        请问,明天上班吗
                                        请问,明天上班吗
                                        请问,明天上班吗
                                        请问,明天上班吗
                                        请问,明天上班吗
                                        请问,明天上班吗
                                        请问,明天上班吗
                                        请问,明天上班吗
                                        </Col>
                                    </Row>
                                </Card>
                                <h1>回答</h1>
                                <Card style="margin-top: 6px">
                                    <div>
                                        <Row>
                                            <Col span="5" style="vertical-align: middle">
                                            <p>
                                                <Tag type="dot" color="green" style="width:95%;">yangrun</Tag>
                                            </p>
                                            <p style="margin-top: 8px">
                                                <Tag type="dot" color="green" style="width:95%;">2019-08-09</Tag>
                                            </p>
                                            </Col>
                                            <Col span="19">
                                            <Alert type="success" style="width: 100%;height: auto">
                                                明天上班 明天上班 明天上班 明天上班 明天上班 明天上班 明天上班 明天上班 明天上班 明天上班 明天上班 明天上班 明天上班
                                            </Alert>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </div>
                        </Card>
                    </Card>
                </div>
            </Col>
            <Col span="6" class="main-col">
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

                    <Card :bordered="true" style="margin-top: 6px"  v-for="item in hotsList" key="item.title">
                        <p slot="title">
                            {{ item.title }}
                        </p>
                        <p>{{ item.content }}</p>
                    </Card>
                </div>
            </Col>
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
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    trigger: 'click',
                    arrow: 'hover'
                },
                hotsList:[],
                hotTitle : '',
                hotContent : ''
            }
        },
        methods: {
            init(){
                this.axios.get('getLatestHots').then(function (res) {
                    if(res.data.code == 0){
                        var resp = res.data.data;
                        for(var i =0 ;i<resp.length ; i++){
                            this.hotsList.push({title : resp[i].title , content : resp[i].content});
                        }
                    }
                }.bind(this));
            },
            addHots(){
                var hotTitle = this.hotTitle;
                var hotContent = this.hotContent;
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
                this.axios.post('addHots',{
                    title:hotTitle,
                    content:hotContent,
                    userId:this.$store.getters.getUserId
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

            }
        },
        mounted() {
            this.init();
        }
    }
</script>