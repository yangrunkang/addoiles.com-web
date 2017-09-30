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

    /*编辑器*/
    #editorDiv {
        margin: auto 50px;
    }

    /*分享内容*/
    .experience-content {
        background:#eee;
        padding:20px
    }

</style>
<template>
    <div class="experience">

        <!--图钉-->
        <Affix :offset-top="10">
            <span class="switch-affix"><h2 style="color: white">显示编辑器&nbsp;<i-switch size='large' @on-change="changeSwitch"><span slot='open'>显示</span><span slot='close'>关闭</span></i-switch></h2></span>
        </Affix>

        <!--编辑器-->
        <div id="editorDiv" v-show="isShowEditor" style="height: 500px">
            <Card class="card" style="height: inherit">
                <p slot="title" style="height: auto;font-size: 18px">分享你的经历,不论是否精彩&nbsp;&nbsp;
                    <Poptip trigger="focus" title="要走心❤" content="不要走肾的">
                        <i-input v-model="experienceTitle" placeholder="给你的经历起个名字吧" size="large"></i-input>
                    </Poptip>
                    <Button type="info" shape="circle" @click="sendExperience('normal')">发表</Button>
                    <Button type="error" shape="circle" @click="confirmModal = true">清空内容</Button></p>
                <!--https://surmon-china.github.io/vue-quill-editor -->
                <quill-editor ref="myTextEditor"
                              v-model="content"
                              :options="editorOption"
                              @focus="onEditorFocus($event)" style="height: 350px">
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
            <Row class="experience-content" :gutter="16">
                <Col span="19">
                    <Card :bordered="false" style="margin-bottom: 5px">
                        <p slot="title">彰化市</p>
                        <p>彰化市位于台湾彰化县东北角，为彰化县县治所在地。彰化市一带早期为隶属平埔族的巴布萨族半线社人的活动场域，旧称“半线”，后明郑部将刘国轩屯兵镇压原住民，在军队保护下，汉人陆续到来，开凿水利，人口渐聚，发展出村落街巷，在台中市产生前，是台湾中部的政经中心。由于彰化市居南北交通要冲，每当民变动乱，该地首当其冲，之后有地方官员植竹为城，略作防卫之用，因此古有“竹城”雅称。境内的八卦山大佛风景区为台湾著名的观光胜地。赖和纪念馆、小西街、孔庙亦为该市的重要观光景点。彰化市约有人口23万4千多人，是彰化县人口最多的行政区，亦为全国人口最多的县辖市。彰化市分为两个地形区，一为东南部的八卦台地地区，一为西北、东北部的平原区。八卦台地又称八卦山脉，在3万到50万年前是大肚溪河床，在板块挤压作用下，隆起褶曲造成八卦山背斜，背斜西翼弯曲断裂，形成彰化断层，长5.8公里。原来的河床隆升为台地，最高点在东南部的银行山，海拔232米，到了西北角的八卦山则降为96米。八卦台地部分崖壁陡峭，豪雨过后容易发生山崩，土石崩落堆置崖脚形成落石堆，地层不稳，故此处不宜建筑房舍。</p>
                    </Card><Alert type="success"><Tag type="border" color="green">2017-09-20</Tag><Tag color="green">kite</Tag>这篇文章写的真好</Alert>

                </Col>
                <Col span="5">
                    <h2>感想+</h2>
                    <Input type="textarea" :rows="3" placeholder="写下你此刻想说的" />
                    <Button type="success" long style="margin-top: 5px">评价</Button>
                    <Alert style="margin-top: 5px;margin-bottom: 5px"><strong>评分:</strong><Rate allow-half ></Rate></Alert>
                    <Tag type="border"  color="blue"><strong>作者:</strong>Tom</Tag>
                    <Tag type="border"  color="green"><strong>发布时间:</strong>2017-09-20</Tag>
                </Col>
            </Row>
        </div>
        <Modal v-model="confirmModal">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>确定要清空吗?</span>
            </p>
            <div style="text-align:center;font-size: 18px">
                <p>如果你写了很多内容,慎重考虑一下.</p>
                <p>或者可以保存为<strong style="color: #ff3300">草稿</strong>下一次可以继续编辑</p>
            </div>
            <div slot="footer">
                <Button type="info" size="large" long @click="sendExperience('normal')">立即分享</Button>
            </div>
            <div slot="footer" style="margin: 4px auto;">
                <Button type="warning" size="large" long @click="sendExperience('draft')">保存为草稿</Button>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="clearContent('true')">坚决删除</Button>
            </div>
        </Modal>
    </div>
</template>
<script>

    import Vue from 'vue';
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
                //编辑器配置
                editorOption: {
                    // something to config
                    placeholder: '不放弃,不抛弃,追梦之路,常常伴随着孤单\n分享自己不一样的经历,同大家一起加油共勉\n如果可以,请在这里书写您独一无二的人生经历'

                },
                //默认不显示编辑器
                isShowEditor : false,
                //确认清除模态框显示与隐藏
                confirmModal : false
            }
        },
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            onEditorFocus(editor) {
            },
            changeSwitch(status){
                if(status){
                    this.isShowEditor = true;
                }else if(!status){
                    this.isShowEditor = false;
                }
            },
            //删除内容
            clearContent(showNotice){
                //清空标题和内容
                this.experienceTitle = "";
                this.content = "";
                //关闭模态框
                this.confirmModal = false;
                //
                if(showNotice) return;
                this.$Notice.info({
                    desc: '内容已清空'
                });
            },
            sendExperience(operation){
                // 请求对象
                var params = new URLSearchParams();
                if(operation == 'normal'){
                    params.append('deleteStatus',0);
                }else if(operation == 'draft'){
                    params.append('deleteStatus',1);
                }else{
                    this.$Notice.error({desc: '不好意思,程序员失误了'});
                }
                //关闭模态框
                this.confirmModal = false;
                //数据校验
                var experienceTitle = this.experienceTitle;
                var experienceContent = this.content;
                if(!this.addoileUtil.validateReq(experienceTitle) || !this.addoileUtil.validateReq(experienceContent)){
                    this.$Notice.warning({
                        desc: '经历标题或内容为空'
                    });
                    return;
                }
                //调用服务端接口
                params.append('title', experienceTitle);
                params.append('content', experienceContent);
                this.axios.post("addExperience",params).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data == 1){

                        if(operation == 'normal'){
                            this.$Notice.success({
                                desc: '经历已经分享'
                            });
                        }else if(operation == 'draft'){
                            this.$Notice.info({
                                desc: '经历已经保存为草稿'
                            });
                        }
                        //todo 追加列表

                        //清空内容
                        this.clearContent('false');
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
        }
    }

</script>