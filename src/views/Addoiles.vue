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

</style>
<template>
    <div class="main-content">
        <Row class="row">
            <Col span="18" class="main-col">
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