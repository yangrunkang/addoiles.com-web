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
                    <Card shadow>
                        <div style="text-align:center">
                            <Carousel
                                    v-model="filmIndex"
                                    :autoplay="setting.autoplay"
                                    :autoplay-speed="setting.autoplaySpeed"
                                    :dots="setting.dots"
                                    :radius-dot="setting.radiusDot"
                                    :trigger="setting.trigger"
                                    :arrow="setting.arrow">
                                <CarouselItem v-for="filmDto in filmDtoList" :key="filmDto.id">
                                    <img :src="filmDto.image">
                                    <h3>{{filmDto.title}}</h3>
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </Card>
                    <br />
                    <Card shadow>
                        <div style="text-align:center">
                            <Carousel
                                    v-model="bookIndex"
                                    :autoplay="setting.autoplay"
                                    :autoplay-speed="setting.autoplaySpeed"
                                    :dots="setting.dots"
                                    :radius-dot="setting.radiusDot"
                                    :trigger="setting.trigger"
                                    :arrow="setting.arrow">
                                <CarouselItem v-for="bookDto in bookDtoList" :key="bookDto.id">
                                    <img :src="bookDto.image">
                                    <h3>{{bookDto.title}}</h3>
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </Card>
                    <br />
                    <Card shadow>
                        <div style="text-align:center">
                            <Carousel
                                    v-model="picIndex"
                                    :autoplay="setting.autoplay"
                                    :autoplay-speed="setting.autoplaySpeed"
                                    :dots="setting.dots"
                                    :radius-dot="setting.radiusDot"
                                    :trigger="setting.trigger"
                                    :arrow="setting.arrow">
                                <CarouselItem v-for="picDto in picDtoList" :key="picDto.id">
                                    <img :src="picDto.image">
                                    <h3>{{picDto.title}}</h3>
                                </CarouselItem>
                            </Carousel>
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
                                        <p class="auto-break-line web-content-font-size">{{ item.content }}</p>
                                        <p class="p-right"><Icon type="person"></Icon>&nbsp;{{ item.userName }}</p>
                                        <p class="p-right"><Icon type="calendar"></Icon>&nbsp;{{ item.createTime }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>


                    </Card>
                </div>
                <div class="public-info">
                    <Card style="color: rgb(158, 167, 180);">
                        网站域名addoiles解释:
                        <br />
                        add:加&nbsp;oil:稀缺资源-油&nbsp;es:复数,多
                        <br />
                        生活不易,多多加油
                        <br />
                        做自己喜欢做的事情,并坚持下去
                        <br />
                        不要等你老了,才感到&nbsp;后悔
                    </Card>
                </div>
                  <div class="public-info">
                    <Card style="color: rgb(158, 167, 180);">
                        站内链接：<br />
                        <a style="color: #9ea7b4;" @click="$store.commit('toJianLi',window)">💡个人简历</a>
                        <br />
                        <a style="color: #9ea7b4;" href="https://segmentfault.com/u/yangrunkang" target="_blank">思否付费问答</a>
                        <br />
                        <a style="color: #9ea7b4;" href="http://www.addoiles.com:8008/" target="_blank">Semantic UI</a>
                        <br />
                        <a style="color: #9ea7b4;" href="http://www.addoiles.com:8109/" target="_blank">公共工具</a>
                        <br />
                        <a style="color: #9ea7b4;" target="_blank" href="https://t.me/addoiles">本站电报组:Telegram</a>
                    </Card>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import $ from "jquery";

    export default {
        data () {
            return {
                filmIndex:0,
                bookIndex:0,
                picIndex:0,
                setting: {
                    index:0,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'outside',
                    radiusDot: true,
                    trigger: 'click',
                    arrow: 'hover'
                },

                //热门列表
                hotsList:[],
                hotsActiveIndex: 0,
                //热门列表定时器
                interval:null,

                //热门标题
                hotTitle : '',
                //热门内容
                hotContent : '',
                //页面查询基础Dto
                queryDto : {
                    page : {
                        pageNo: 0,
                        pageSize: 20
                    }
                },
                filmDtoList:[],
                bookDtoList:[],
                picDtoList:[]
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

                this.axios.post('microContentList',this.queryDto).then(function (res) {
                    if(res.code === 0){
                        let resp = res.data;
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
            initImages(){
                this.axios.post('recommendList').then(function (res) {
                    if(res.code === 0){
                        let resp = res.data;
                        for(let i =0 ;i<resp.length ; i++){
                            let image = resp[i];
                            if(image.type === 0){
                                this.filmDtoList.push({
                                    title : image.title,
                                    content : image.content,
                                    image : image.image
                                });
                                continue;
                            }

                            if(image.type === 1){
                                this.bookDtoList.push({
                                    title : image.title,
                                    content : image.content,
                                    image : image.image
                                });
                                continue;
                            }

                            if(image.type === 2){
                                this.picDtoList.push({
                                    title : image.title,
                                    content : image.content,
                                    image : image.image
                                });
                            }

                        }
                    }
                }.bind(this));
            },
            //发表热门
            addHots(){
                /*入口校验*/
                this.$store.commit('validateLogin',this);
                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return null;
                }
                /*入口校验End*/

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
                    tokenId:sessionStorage.getItem("tokenId"),
                    microType:0
                }).then(function (resp) {
                    if(resp.code === 0 && resp.data > 0){
                        this.$Notice.info({
                            title: '动弹成功',
                            desc:'提示'
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
                            title: '动弹失败~~',
                            desc:'提示'
                        });
                    }
                }.bind(this));

            },
            setHotsInterval(){
                this.interval = setInterval(_ => {
                    let hotLength = this.hotsList.length;
                    if(this.hotsActiveIndex < hotLength) {
                        this.hotsActiveIndex += 1;
                    } else {
                        this.hotsActiveIndex = -1;
                    }
                }, 3000);
            }
        },
        mounted() {
            this.initHots();
            this.initImages();
            //首次运行
            this.setHotsInterval();
            //鼠标移至目标后停止轮播
            $(".scroll-content").hover(function () {
                window.clearInterval(this.interval);
            }.bind(this),function () {
                this.setHotsInterval();
            }.bind(this));
        }
    }
</script>