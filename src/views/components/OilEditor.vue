<style scoped lang="less">
    @import "../../styles/common.css";
</style>
<template>
    <div>
        <!--编辑器-->
        <Card class="edit-card" shadow>
            <p slot="title" style="height: auto;font-size: 18px">
                <i-input v-model="title" placeholder="标题" size="large" style="width:605px;" />
                <span style="float: right;">
                    是否公开:
                     <Switch size="large" :value="isHide" @on-change="changeHide">
                        <span slot="open">公开</span>
                        <span slot="close">隐藏</span>
                    </Switch>
                    <!--在发表的时候检测是否有businessId,如果有,是编辑完成了,想发表;这样文章可以随意编辑多少次-->
                    <Button type="info" shape="circle" v-show="saveBtn" @click="saveArticle('addArticle',0)">{{this.saveBtnText}}</Button>
                    <!--编辑完成:是在有文章的基础上编辑,不论文章时什么状态,此时编辑完成就有歧义了,应该为:保存为草稿;下面的立即发表应该为:发表-->
                    <Button type="success" shape="circle" v-show="editDownBtn" @click="saveArticle('editArticle',2)">{{this.editDownBtnText}}</Button>
                    <Button type="warning" shape="circle" v-show="draftBtn" @click="saveArticle('addArticle',2)">保存为草稿</Button>
                    <Button type="error" shape="circle" @click="confirmModal = true">清空内容</Button>
                </span>
            </p>
            <!--https://surmon-china.github.io/vue-quill-editor -->
            <quill-editor ref="myTextEditor"
                          v-model="content"
                          :options="editorOption"
                          class="quill-editor-style">
            </quill-editor>
        </Card>

        <Modal v-model="confirmModal">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>确定要清空吗?</span>
            </p>
            <div style="text-align:center;font-size: 18px">
                <p>如果您写了很多内容,可以考虑先保存为草稿</p>
            </div>
            <div slot="footer" style="margin: 4px auto;">
                <Button type="error" size="large" long @click="confirmClearContent(true)">坚决清空内容</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    //编辑器: 统一发表/编辑内容

    //安装vue-quill-editor富文本编辑器
    import Vue from 'vue';
    import VueQuillEditor from 'vue-quill-editor';
    //https://github.com/NextBoy/quill-image-extend-module
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module';
    Quill.register('modules/ImageExtend', ImageExtend);
    Vue.use(VueQuillEditor);
    export default {
        data () {
            return {

                /*****************/
                //业务ID
                businessId:null,
                //文章类型 0-经历分享 1-软件评测 2-IT文章    用于articleType
                articleType:-1,
                //标题
                title : '',
                //内容
                content : '',
                //删除状态
                deleteStatus:-1,
                //文章是否公开
                isHide:true,
                /*****************/

                //编辑器配置
                editorOption: {
                    // something to config
                    placeholder: '在这里书写',
                    modules: {
                        ImageExtend: {
                            loading: true,
                            name: 'file',  // 图片参数名,notice:if write img,upload will fail
                            size: 50,  // 可选参数 图片大小，单位为M，1M = 1024kb
                            action: this.uploadImage,  // 服务器地址, 如果action为空，则采用base64插入图片
                            response: (res) => {
                                if(res.code === 0){
                                    console.log(res.data);
                                    return res.data;
                                }else{
                                    this.$Notice.warning({
                                        desc: res.message
                                    });
                                    return 'failed' + res.message;
                                }
                            },
                        },
                        toolbar: {
                            container: container,  // container为工具栏，此次引入了全部工具栏，也可自行配置
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                    QuillWatch.emit(this.quill.id)
                                }
                            }
                        }
                    }
                },
                //确认清除模态框显示与隐藏
                confirmModal : false,
                //发表按钮
                saveBtn: true,
                //编辑完成
                editDownBtn:false,
                //保存为草稿按钮
                draftBtn:true,
                //解决不同操作 歧义的按钮文字
                editDownBtnText:"编辑完成",
                saveBtnText:"立即发表",
            }
        },
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            //编辑完成
            saveArticle(operation,deleteStatus){

                if(this.articleType < 0 || this.deleteStatus < 0){
                    this.$Notice.error({
                        desc: '侦测到恶意请求,非正常途径访问油站编辑器'
                    });
                    return null;
                }

                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return null;
                }

                let title = this.title;
                let content = this.content;
                if(!this.addoileUtil.validateReq(title) || !this.addoileUtil.validateReq(content)){
                    this.$Notice.warning({
                        desc: '标题或内容为空'
                    });
                    return null;
                }

                if(title.length > 50){
                    this.$Message.warning("标题字数不能多余50个",3);
                    return null;
                }

                //在点击发表的时候检测是否有businessId,如果有,是编辑完成了,想发表;这样文章可以随意编辑多少次
                if(this.addoileUtil.validateReq(this.businessId) && operation === 'addArticle'){
                    operation = 'editArticle'; // 是更新操作,因为有businessId
                    deleteStatus = 0; //更新为正常状态
                }

                let article = {
                    // addOilArticle时后台生成,editOilArticle需要这个值
                    //不写businessId:this.businessId,因为是Entity入库,不是Query
                    articleId:this.businessId,
                    articleType:this.articleType,
                    userId:sessionStorage.getItem("userId"),
                    title:this.title,
                    content:this.content,
                    // 不能带业务字段
                    // rates:0,
                    // rateCount:0,
                    isHide:this.isHide?0:1,
                    deleteStatus:deleteStatus,
                    tokenId:sessionStorage.getItem("tokenId")
                };

                //保存为草稿,说明之前已经有了,改为编辑
                // if(deleteStatus === 2){
                //     operation = 'editArticle';
                // }
                this.$Notice.info({
                    desc: '正在执行您的指令..稍等片刻',
                    duration: 2
                });
                //调用服务端接口
                this.axios.post(operation,article).then(function (resp) {
                    if(resp.data.code === 0 && resp.data.data === 1){
                        this.$Notice.success({
                            desc: '完成'
                        });
                        setTimeout(function () {
                            this.$router.go(-1);
                        }.bind(this), 1000);
                        this.clearContent();
                    }else if(resp.data.data === 1002){
                        this.$Notice.error({
                            title:"操作失败,原因可能如下:",
                            desc: '1.文本内容过余长了;2.图片占用存储太大;3.可能文本中包含非正常字符;',
                            duration:0
                        });
                    }
                }.bind(this));

            },
            confirmClearContent(showNotice){

                if(!showNotice) return;

                this.clearContent();

                this.$Notice.success({
                    desc: '遵照您的旨意,已经把内容清空'
                });

                this.confirmModal = false;
            },
            //清空内容
            clearContent(){
                this.title = '';
                this.content = '';
            },
            //初始化编辑器
            initOilEditor(){

                this.clearContent();

                try{
                  /*
                  编辑完回到上一个页面 $router.go(-1)

                  目前是这种结构:
                      let editObject = {
                          //type: 0-发表 1-编辑 //businessId为空就是发表,否则就是编辑
                          //from:0 // 0-经历分享 1-软件评测 2-IT文章    用于articleType
                          businessId:业务id,eg.IT文章id,经历分享,
                          // businessId唯一,不需要Type//businessType:businessId对应的businessType,eg,IT文章id对应的IT文章Type是2,
                      };
                   */

                    let editObj = JSON.parse(sessionStorage.getItem("editObj"));

                    //发表
                    if(editObj.businessId == null){
                        this.editDownBtn = false;

                        this.clearContent();
                        this.articleType = editObj.articleType;
                        this.deleteStatus = 0; //默认新增,状态为正常
                        return null;
                    }

                    //编辑
                    if(editObj.businessId != null){
                        this.businessId = editObj.businessId;

                        this.editDownBtn = true;
                        this.saveBtn = true;
                        this.draftBtn = false;
                        this.editDownBtnText = "保存为草稿";
                        this.saveBtnText = "发表";

                        let queryDto = {
                            userId:sessionStorage.getItem("userId"),
                            businessId:editObj.businessId,
                            tokenId:sessionStorage.getItem("tokenId")
                        };

                        //safe
                        sessionStorage.removeItem("editObj");
                        this.axios.post('getArticleByBusinessId',queryDto).then(function (resp) {
                            let db_return_data = resp.data.data;
                            if(resp.data.code === 0 && db_return_data != null){
                                this.title = db_return_data.title;
                                this.content = db_return_data.content;
                                this.articleType = db_return_data.articleType;
                                this.deleteStatus = db_return_data.deleteStatus;
                                this.isHide = db_return_data.isHide == 0 ? true : false;
                            }else {
                                this.$store.commit('loadingFailed',this);
                            }
                        }.bind(this));
                        return null;
                    }
                }catch (e){
                    this.$Notice.error({
                        desc: '初始化编辑器:非正常途径访问该页面,或者您刷新了整个页面'
                    });
                }


            },
            /**
             * 是否公开
             * @param status
             */
            changeHide(status){
                this.isHide = status;
            }
        },
        // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，
        // 实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        },
        mounted() {
           this.initOilEditor();
        }
    }

</script>