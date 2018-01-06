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


</style>
<template>
    <div>
        <Row class="row">
            <i-col span="18" class="main-col">
                <div id="cycle-pics">
                    <!--电影推荐-->
                    <!--书本推荐-->
                    <Card>
                        <div style="text-align:center">
                            <img src="../images/index0.png">
                            <h3>电影推荐</h3>
                        </div>
                    </Card>
                    <br />
                    <Card>
                        <div style="text-align:center">
                            <img src="../images/index2.png">
                            <h3>新书推荐</h3>
                        </div>
                    </Card>
                </div>
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

                    <Carousel
                            v-model="hotsCarousel"
                            :autoplay="hotsSetting.autoplay"
                            :autoplay-speed="hotsSetting.autoplaySpeed"
                            :dots="hotsSetting.dots"
                            :radius-dot="hotsSetting.radiusDot"
                            :trigger="hotsSetting.trigger"
                            :arrow="hotsSetting.arrow">
                        <CarouselItem  v-for="item in hotsList" :key="item.id">
                            <Card :bordered="false">
                                <p slot="title" class="auto-break-line">
                                    {{ item.title }}
                                </p>
                                <p class="auto-break-line" style="font-size: 20px">{{ item.content }}</p>
                                <p class="p-right"><Icon type="person"></Icon>&nbsp;{{ item.userName }}</p>
                                <p class="p-right"><Icon type="calendar"></Icon>&nbsp;{{ item.createTime }}</p>
                            </Card>
                        </CarouselItem>
                    </Carousel>
                </div>


            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                hotsCarousel: 0,
                hotsSetting: {
                    autoplay: true,
                    autoplaySpeed: 2000,
                    loop:true,
                    dots: 'none',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'never',
                    easing:"ease"
                },
                //热门列表
                hotsList:[],
                //热门标题
                hotTitle : '',
                //热门内容
                hotContent : '',
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
                            this.hotsList.push({
                                title : resp[i].title ,
                                content : resp[i].content,
                                id:resp[i].id,
                                createTime:this.addoileUtil.formatUnixTime(resp[i].createTime),
                                userName:resp[i].userName
                            });
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

                if(hotContent.length >= 500){
                    this.$Message.warning("动弹内容字数不能多余500个",3);
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
                        this.hotsList.unshift({
                            title : hotTitle,
                            content : hotContent,
                            userName : sessionStorage.getItem('userName'),
                            createTime : '刚刚'
                        });
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
        },
        mounted() {
            this.initHots();
        }
    }
</script>