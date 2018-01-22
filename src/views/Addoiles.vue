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
        height: fit-content;
    }

    /*梦想*/
    .public-info {
        margin: 0px 0px 10px 10px;
    }

    #cycle-pics {
        width: 100%;
        height: fit-content;
    }

    .scroll-wrap{
        width: inherit;
        height: 800px;
        overflow: hidden;
    }

    .scroll-content{
        position: relative;
        transition: top 0.5s;

        li{
            line-height: inherit;
        }
    }

</style>
<template>
    <div>
        <Row class="row">
            <i-col span="18" class="main-col">
                <div id="cycle-pics">
                    <!--电影推荐-->
                    <!--书本推荐-->
                    <Card shadow>
                        <div style="text-align:center">
                            <img :src="filmDto.image">
                            <h3>电影推荐之{{filmDto.title}}</h3>
                        </div>
                    </Card>
                    <br />
                    <Card shadow>
                        <div style="text-align:center">
                            <img :src="bookDto.image">
                            <h3>新书推荐之{{bookDto.title}}</h3>
                        </div>
                    </Card>
                    <br />
                    <Card shadow>
                        <div style="text-align:center">
                            <img :src="picDto.image">
                            <h3>图片分享之{{picDto.title}}</h3>
                        </div>
                    </Card>
                </div>
            </i-col>
            <i-col span="6" class="main-col">
                <div class="hot-msg">
                    <Card shadow>
                        <h2>热门动弹</h2>
                        <Button type="success" long style="margin-bottom: 5px" @click="addHots">发表动弹</Button>
                        <p>
                            <Input placeholder="热点标题" style="margin-bottom: 5px" v-model="hotTitle"/>
                            <Input type="textarea" :rows="4" placeholder="热门描述" v-model="hotContent"/>
                        </p>
                        <br />
                        <div class="scroll-wrap">
                            <ul class="scroll-content" :style="{ top }">
                                <li  v-for="item in hotsList" :key="item.id">
                                    <div>
                                        <strong class="auto-break-line" style="font-size: 18px">
                                            {{ item.title }}
                                        </strong>
                                        <p class="auto-break-line" style="font-size: 20px">{{ item.content }}</p>
                                        <p class="p-right"><Icon type="person"></Icon>&nbsp;{{ item.userName }}</p>
                                        <p class="p-right"><Icon type="calendar"></Icon>&nbsp;{{ item.createTime }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>


                    </Card>
                </div>
                <div class="public-info">
                    <Card shadow style="color: rgb(158, 167, 180);">
                        首页内容图片展示可投稿至yangrunkang53@gmail.com
                        <br /><br />
                        图片要求:813px*400px(宽*高)
                        <br /><br />
                        Tips:可使用截图工具截取指定尺寸
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

                //热门列表
                hotsList:[],
                hotsActiveIndex: 0,

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
                },
                filmDto:{},
                bookDto:{},
                picDto:{}
            }
        },
        computed: {
            top: function () {
                return -this.hotsActiveIndex * 50 + 'px';
            }
        },
        methods: {
            //初始化热门动弹
            initHots(){
                this.queryDto.microType = 0;

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

                setInterval(_ => {
                    if(this.hotsActiveIndex < this.hotsList.length) {
                        this.hotsActiveIndex += 1;
                    } else {
                        this.hotsActiveIndex = 0;
                    }
                }, 1000);
            },
            initImages(){
                this.axios.post('getFistPageImage').then(function (res) {
                    if(res.data.code == 0){
                        let resp = res.data.data;
                        for(let i =0 ;i<resp.length ; i++){
                            let image = resp[i];
                            if(image.type === 0){
                                this.filmDto.title = image.title;
                                this.filmDto.content = image.content;
                                this.filmDto.image = image.image;
                            }

                            if(image.type === 1){
                                this.bookDto.title = image.title;
                                this.bookDto.content = image.content;
                                this.bookDto.image = image.image;
                            }

                            if(image.type === 2){
                                this.picDto.title = image.title;
                                this.picDto.content = image.content;
                                this.picDto.image = image.image;
                            }

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
            this.initImages();
        }
    }
</script>