<style scoped lang="less">
    @import "../styles/common.css";

    .dream-card {
        border-radius: 30px;
        margin-bottom: 6px;
        margin-left: 6px
    }

    .dream-btn {
        width: 100%;
        height: 100%;
        font-size:xx-large;
    }

    .demo-badge-alone{
        background: #5cb85c !important;
    }

</style>
<template>
    <div>

        <transition name="fade">
            <Card style="width: 94%;margin: 20px auto;" v-show="isShowAffix"  shadow>
                <Row type="flex">
                    <i-col span="20">
                        <Input v-model="dreamTitle" type="text"  placeholder="写下你的梦想" style="width: 99%;margin-bottom: 10px;" />
                        <Input v-model="dreamContent" type="textarea" :rows="7" placeholder="例如:我的梦想是实现自己的价值,做自己喜欢做的事情" style="width: 99%;" />
                    </i-col>
                    <i-col span="4">
                        <Button class="dream-btn" type="info"  size="large" @click="toDreamWall()">许下梦想</Button>
                    </i-col>
                </Row>
            </Card>
        </transition>

        <div>
            <Row type="flex">
                <i-col span="8">
                    <Alert :type="item.alertType" class="dream-card" v-for="item in dreamListCol1" :key="item.id">
                        <strong class="auto-break-line">{{item.dreamTitle}}</strong>
                        <span slot="desc" class="auto-break-line web-content-font-size" >{{item.dreamContent}}</span>
                    </Alert>
                    <!--<Button type="info" icon="thumbsup" style="width: 100%">点赞(99+)</Button>-->
                </i-col>
                <i-col span="8">
                    <Alert :type="item.alertType" class="dream-card" v-for="item in dreamListCol2" :key="item.id">
                        <strong class="auto-break-line">{{item.dreamTitle}}</strong>
                        <span slot="desc" class="auto-break-line web-content-font-size" >{{item.dreamContent}}</span>
                    </Alert>
                </i-col>
                <i-col span="8">
                    <Alert :type="item.alertType" class="dream-card" v-for="item in dreamListCol3" :key="item.id">
                        <strong class="auto-break-line">{{item.dreamTitle}}</strong>
                        <span slot="desc" class="auto-break-line web-content-font-size" >{{item.dreamContent}}</span>
                    </Alert>
                </i-col>
            </Row>
        </div>
        <Button type="info" size="large" long style="width: 100%;margin-top: 10px" :disabled="loadMoreBtnDisabled" @click="loadMore()" >
            <div v-show="loadMoreBtnDisabled">已全部加载</div>
            <div v-show="!loadMoreBtnDisabled">加载更多</div>
        </Button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                loadMoreBtnDisabled:false, //加载更多按钮是否可用
                isShowAffix : false, //一开始不显示,5秒后显示
                dreamTitle : null, //梦想标题
                dreamContent : null, //梦想内容
                dreamList : [], //梦想列表
                //将dreamList平分,放到下面三个列表中
                dreamListCol1 : [], //梦想列表1
                dreamListCol2 : [], //梦想列表2
                dreamListCol3 : [], //梦想列表3
                //页面查询基础Dto
                queryDto : {
                    page : {
                        pageNo: 0,
                        pageSize: 10
                    }
                }
            }
        },
        mounted() {
            this.initDreams(); //初始化梦想

            setTimeout(function () {
               this.isShowAffix = true;
            }.bind(this),1000);

        },
        methods:{
            //许下梦想
            toDreamWall() {

                /*入口校验*/
                this.$store.commit('validateLogin',this);
                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return null;
                }
                /*入口校验End*/

                let dreamTitle = this.dreamTitle;
                let dreamContent = this.dreamContent;
                //参数校验
                if(!this.addoileUtil.validateReq(dreamTitle) || !this.addoileUtil.validateReq(dreamContent)){
                    this.$Message.warning("一个完整的梦想有助于你梦想成真哦",3);
                    return;
                }

                if(dreamTitle.length > 32){
                    this.$Message.warning("梦想标题字数不能多余32个",3);
                    return;
                }

                if(dreamContent.length > 500){
                    this.$Message.warning("梦想内容字数不能多余500个",3);
                    return;
                }
                //发送至服务器
                this.axios.post('addMicroContent',{
                    title:dreamTitle,
                    content:dreamContent,
                    userId:userId,
                    tokenId:sessionStorage.getItem("tokenId"),
                    microType:1
                }).then(function (response) {
                    if(response.code === 0 && response.data === 1){
                        this.dreamList.unshift({dreamTitle:dreamTitle,dreamContent:dreamContent});
                        this.splitDreamList(this.dreamList);
                        //弹窗提示
                        this.$Notice.success({
                            title: '许愿成功,愿您早日实现自己的梦想',
                            desc: '加油!'
                        });
                    }else{
                        this.$Notice.info({
                            title: '抱歉',
                            desc: '我们系统出错了~'
                        });
                    }
                    //清空数据
                    this.dreamTitle = null;
                    this.dreamContent = null;
                }.bind(this));
            },
            /**
             * 初始化梦想
             */
            initDreams() {


                this.queryDto.microType=1;

                this.axios.post('microContentList',this.queryDto).then(function (res) {
                    if(res.code === 0 && res.data.length > 0){
                        let response = res.data;
                        for(let i = 0 ; i < response.length ; i++){
                            let dream = response[i];
                            this.dreamList.push({dreamTitle : dream.title , dreamContent : dream.content,alertType:this.addoileUtil.getRandAlertType()});
                        }
                        // 分配
                        this.splitDreamList(this.dreamList);
                    }else{
                        this.loadMoreBtnDisabled = true;
                    }
                }.bind(this));
            },
            /**
             * 布局
             * @param dreamList
             */
            splitDreamList(dreamList){
               if(dreamList instanceof Array){
                   if(dreamList.length === 0){
                       return;
                   }
                   let dreamListSize = dreamList.length;
                   let everyArr = dreamListSize / 3;
                   this.dreamListCol1 = dreamList.slice(0,everyArr);
                   this.dreamListCol2 = dreamList.slice(everyArr,everyArr*2);
                   this.dreamListCol3 = dreamList.slice(everyArr*2,dreamListSize);
               }
            },
            /**
             * 加载更多
             */
            loadMore(){
                this.queryDto.page.pageNo += this.queryDto.page.pageSize;
                this.initDreams();
            }
        }

    }
</script>