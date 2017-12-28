<style scoped lang="less">
    @import "../../styles/common.css";
</style>
<template>
    <div>
        <!--未登录时展示-->
        <Alert type="error" class="not-login-tips" v-show="showNotLoginTips">
            您还未登录
        </Alert>
        <!--编辑器-->
        <Card class="edit-card">
            <p slot="title" style="height: auto;font-size: 18px">
                <i-input v-model="title" placeholder="标题" size="large" style="width:605px;" />
                <span style="float: right;">
                    <!--如果是草稿文章,点击编辑完成应该变成正正常文章;编辑完成按钮显示时,保存为草稿也应该显示;如何保证操作是我想要的？-->
                    <Button type="success" shape="circle" v-show="editBtn" @click="saveArticle('editArticle',deleteStatus)">编辑完成</Button>
                    <Button type="info" shape="circle" v-show="shareBtn" @click="saveArticle('addArticle',0)">发表</Button>
                    <Button type="warning" shape="circle" v-show="shareBtn" @click="saveArticle('addArticle',2)">保存为草稿</Button>
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
                <p>如果你写了很多内容,慎重考虑一下.</p>
                <!--<p>或者可以保存为<strong style="color: #ff3300">草稿</strong>下一次可以继续编辑</p>-->
            </div>
<!--            <div slot="footer">
                <Button type="info" size="large" long @click="saveExperience('normal')">立即分享</Button>
            </div>
            <div slot="footer" style="margin: 4px auto;">
                <Button type="warning" size="large" long @click="saveExperience('draft')">保存为草稿</Button>
            </div>-->
            <div slot="footer" style="margin: 4px auto;">
                <Button type="error" size="large" long @click="confirmClearContent(true)">坚决删除</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    //编辑器: 统一发表/编辑内容

    //安装vue-quill-editor富文本编辑器
    import Vue from 'vue';
    import Cookies from 'js-cookie';
    import VueQuillEditor from 'vue-quill-editor';
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
                /*****************/

                //编辑器配置
                editorOption: {
                    // something to config
                    placeholder: '在这里书写'

                },
                //确认清除模态框显示与隐藏
                confirmModal : false,
                //未登录分享经历时提示
                showNotLoginTips: false,
                //默认显示分享和保存为草稿按钮,编辑时不显示
                shareBtn: true,
                //默认编辑按钮不显示
                editBtn:false,
            }
        },
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            //编辑完成
            saveArticle(operation,deleteStatus){

                if(this.articleType < 0 || this.deleteStatus < 0){
                    this.$Notice.error({
                        desc: '侦测到恶意请求,非正常入境访问油站编辑器'
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

                let article = {
                    // addOilArticle时后台生成,editOilArticle需要这个值
                    //不写businessId:this.businessId,因为是Entity入库,不是Query
                    articleId:this.businessId,
                    userId:sessionStorage.getItem("userId"),
                    title:this.title,
                    content:this.content,
                    articleType:this.articleType,
                    deleteStatus:deleteStatus
                };

                console.log(article);

                //调用服务端接口
                this.axios.post(operation,article).then(function (resp) {
                    if(resp.data.code == 0 && resp.data.data == 1){
                        this.$Notice.success({
                            desc: '完成'
                        });
                        setTimeout(function () {
                            this.$router.go(-1);
                        }.bind(this), 1000);
                    }else if(resp.data.data == 1002){
                        this.$Notice.error({
                            desc: '文本内容过长,请精简,或者减少部分图片内容'
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
                        this.editBtn = false;
                        this.clearContent();
                        this.articleType = editObj.articleType;
                        this.deleteStatus = 0; //默认新增,状态为正常
                        return null;
                    }

                    //编辑
                    if(editObj.businessId != null){
                        this.businessId = editObj.businessId;
                        this.editBtn = true;
                        this.shareBtn = false;


                        let queryDto = {
                            businessId:editObj.businessId
                        };

                        this.axios.post('getArticleByBusinessId',queryDto).then(function (resp) {
                            let db_return_data = resp.data.data;
                            if(resp.data.code == 0 && db_return_data != null){
                                this.title = db_return_data.title;
                                this.content = db_return_data.content;
                                this.articleType = db_return_data.articleType;
                                this.deleteStatus = db_return_data.deleteStatus;
                            }
                        }.bind(this));
                        return null;
                    }
                }catch (e){
                    this.$Notice.error({
                        desc: '初始化编辑器:非正常途径访问该页面,不要乱搞哦'
                    });
                }

                //safe
                sessionStorage.removeItem("editObj");
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
           this.initOilEditor();
        }
    }

</script>