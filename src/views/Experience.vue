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

    /*评论*/
    /*.talks {*/
        /*padding-left: 10px;*/
        /*background: white;*/
        /*height: inherit;*/
        /*border-radius: 20px;*/
    /*}*/


</style>
<template>
    <div class="experience">

        <!--图钉-->
        <Affix :offset-top="10" v-show="isShowAffix">
            <span class="switch-affix"><h2 style="color: white">显示编辑器&nbsp;<i-switch size='large' @on-change="changeSwitch"><span slot='open'>显示</span><span slot='close'>关闭</span></i-switch></h2></span>
        </Affix>

        <!--编辑器-->
        <div id="editorDiv" v-show="isShowEditor" style="height: 500px">
            <Card class="card" style="height: inherit">
                <p slot="title" style="height: auto">分享你的经历,不论是否精彩&nbsp;&nbsp;
                    <Button type="info" shape="circle" @click="sendExperience">发表</Button>
                    <Button type="error" shape="circle" @click="clearContent">清空内容</Button></p>
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
                    <Alert style="margin-top: 5px;margin-bottom: 5px"><strong>评分:</strong><Rate allow-half v-model="valueHalf"></Rate></Alert>
                    <Tag type="border"  color="blue"><strong>作者:</strong>Tom</Tag>
                    <Tag type="border"  color="green"><strong>发布时间:</strong>2017-09-20</Tag>
                </Col>
            </Row>




        </div>

    </div>

</template>
<script>

    import Vue from 'vue';

    import VueQuillEditor from 'vue-quill-editor'; //安装vue-quill-editor富文本编辑器
    Vue.use(VueQuillEditor);

    //鼠标焦点到编辑器编辑区内容时，清空预置内容
    var firstFocusEditor = false;

    export default {
        data () {
            return {
                content: "<h1><strong style='color: rgb(102, 163, 224);'>分享不一样的经历，共勉</strong></h1><p><span style='color: rgb(102, 163, 224);'>不放弃,不抛弃,追梦之路,不孤单</span></p>",
                editorOption: {
                    // something config


                },
                isShowEditor : false,  //默认不显示编辑器
                isShowAffix : false //一开始不显示,5秒后显示
            }
        },
        // if you need to manually control the data synchronization, parent component needs to explicitly emit an event instead of relying on implicit binding
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            onEditorFocus(editor) {

                if(!firstFocusEditor){
                    this.content = "";
                    firstFocusEditor = true;
                }

            },
            changeSwitch(status){
                if(status){
                    this.isShowEditor = true;
                }else if(!status){
                    this.isShowEditor = false;
                }
            },
            clearContent(){
                this.content = "";
                //todo 弹窗提示用户,是否清空

                this.$Notice.success({
                    title: '提示',
                    desc: '内容已清空'
                });
            },
            sendExperience(){
                //todo 调用服务端接口
                this.$Notice.success({
                    title: '内容',
                    desc: this.content
                });
                //todo 追加 可先不做

            }
        },
        // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
        // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            }
        },
        mounted() {
            // you can use current editor object to do something(editor methods)
            // this.editor to do something...
            //5秒后显示 打开/关闭 编辑框的 Affix
            setTimeout(() => {
               this.isShowAffix = true;
            },1);
        }
    }



//    Vue.component('switch-div', {
//        template: "<i-switch size='large'><span slot='open'>开启</span><span slot='close'>关闭</span></i-switch>"
//    })
//
//    new Vue({
//        el: '#switch'
//    })

</script>