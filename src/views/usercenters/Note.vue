<template>
    <div>
        <h2>标题:&nbsp;<i-input v-model="title" placeholder="标题" size="large" style="width:605px;margin-bottom: 3px;" /></h2>

        <div style="height: 367px">
            <vue-editor v-model="content"
                        useCustomImageHandler
                        @imageAdded="handleImageAdded"
            ></vue-editor>
        </div>
        <Button v-show="noteBtn" type="info" size="large" long @click="toNote()">小记</Button>
        <Button v-show="!noteBtn" type="info" size="large" long @click="toNote()">保存</Button>
        <br />
        <br />
        <Table border :columns="noteColumns" :data="noteList"></Table>
        <Page :total="totalCount" @on-change="changePage" show-total style="text-align: right;"></Page>

        <!--查看模态框-->
        <Modal
                width="1140"
                v-model="showModal"
                :styles="{top: '20px'}"
                :closable="true"
                :mask-closable="false"
                :transition-names="['fade','ease']"
        >
            <p slot="header">
                <strong>{{noteTitle}}</strong>
            </p>
            <div class="ql-snow">
                <div class="ql-editor">
                    <p class="auto-break-line web-content-font-size" v-html="noteContent"></p>
                </div>
            </div>
            <div slot="footer">
                <p style="text-align: center;font-weight: bold">小记客栈</p>
            </div>
        </Modal>


    </div>
</template>

<script>


    import { VueEditor } from "vue2-editor";

    export default {
        components: {VueEditor},
        data() {
            return {
                //标题
                title:'',
                //内容
                content : '',
                //总数
                totalCount:0,
                //查看模态框的内容和标题
                noteContent : '',
                noteTitle : '',
                //按钮展示
                noteBtn:true,
                //小记ID
                noteBusinessId:'',
                //是否展示模态框
                showModal:false,
                //编辑器配置
                editorOption: {},

                noteColumns:[
                    {
                        title:"标题",
                        key:"title"
                    },
                    {
                        title:"操作",
                        key:"op",
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.view(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
                    {
                        title:"创建时间",
                        key:"createTime"
                    }
                ],
                noteList:[]
            }
        },
        methods:{
            /**
             * 查看
             * */
            view(tableIndex){
                let noteId = this.noteList[tableIndex].noteId;

                let queryDto = {
                    businessId : noteId,
                    userId: sessionStorage.getItem("userId"),
                    tokenId: sessionStorage.getItem("tokenId")
                };

                this.showModal = true;
                this.axios.post('getArticleByBusinessId',queryDto).then(function (resp) {
                    let data = resp.data;
                    if(resp.code === 0 && data != null){
                        this.noteTitle = data.title;
                        this.noteContent = data.content;
                    }else{
                        this.$store.commit('loadingFailed',this);
                    }
                }.bind(this));

            },
            /**
             * 编辑
             * */
            edit(tableIndex){
                let noteId = this.noteList[tableIndex].noteId;

                let queryDto = {
                    businessId:noteId,
                    userId:sessionStorage.getItem("userId"),
                    tokenId:sessionStorage.getItem("tokenId")
                };

                this.axios.post('getArticleByBusinessId',queryDto).then(function (resp) {
                    let data = resp.data;
                    if(resp.code === 0 && data != null){

                        this.clearContent();

                        this.title = data.title;
                        this.content = data.content;
                        this.noteBusinessId = data.articleId;

                        //按钮变换
                        this.noteBtn = false;
                        //定位到顶部
                        window.scrollTo(0, 0);
                    }else{
                        this.$store.commit('loadingFailed',this);
                    }
                }.bind(this));
            },
            /**
             * 移除文章
             * */
            remove(tableIndex){
                let noteId = this.noteList[tableIndex].noteId;

                if(noteId === this.noteBusinessId){
                    this.$Notice.info({
                        desc: '您正在编辑此条小记,不允许[删除]操作'
                    });
                    return;
                }

                let _this = this;
                let config = {
                    content:'确定要从小记客栈中删除【'+this.noteList[tableIndex].title+'】 这则小记吗?',
                    okText:'确认',
                    onOk(){
                        let queryDto = {
                            businessId:noteId,
                            userId: sessionStorage.getItem("userId"),
                            tokenId: sessionStorage.getItem("tokenId")
                        };
                        _this.axios.post("deleteArticle",queryDto).then(function (response) {
                            if(response.code === 0 && response.data > 0){
                                _this.noteList.splice(tableIndex,1);
                                this.$store.commit('deleteSuccess',_this);
                            }else {
                                this.$store.commit('deleteFailed',_this);
                            }
                        }.bind(_this));
                    }
                };
                this.$Modal.confirm(config);
            },
            /**
             * 去保存笔记
             */
            toNote(){

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }

                if(!this.addoileUtil.validateReq(this.content)){
                    this.$Notice.info({
                        desc: '亲,您还未写任何内容哦～～'
                    });
                    return null;
                }

                if(!this.addoileUtil.validateReq(this.title)){
                    this.$Notice.info({
                        desc: '亲,给小记起个名字吧,方面你后面管理'
                    });
                    return null;
                }

                let note = {
                    userId : userId,
                    articleType : 1,
                    title : this.title,
                    content : this.content,
                    isHide : 0,
                    deleteStatus : 0,
                    tokenId: sessionStorage.getItem("tokenId")
                };

                let operation = '';
                if(this.noteBtn){
                    operation = 'addArticle';
                }else{
                    operation = 'editArticle';
                    note.articleId = this.noteBusinessId;
                }

                this.axios.post(operation,note).then(function (resp) {
                    if(resp.code === 0 && resp.data === 1){
                        this.$Notice.success({
                            desc: this.noteBtn?'已经保存成功':'已经编辑成功,您可以继续编辑《'+this.title+'》'
                        });
                        //保存成功,跳转
                        if(this.noteBtn){
                            setTimeout(function () {
                                this.$router.go(0);
                            }.bind(this), 1000);
                        }
                    }else if(resp.data === 1002){
                        this.$Notice.error({
                            title:"操作失败,原因可能如下:",
                            desc: '1.文本内容过余长了;2.图片占用存储太大;3.可能文本中包含非正常字符;',
                            duration:0
                        });
                    }
                }.bind(this));
            },
            /**
             * 初始化用户笔记
             */
            initUserNotes(page){
                let userId = sessionStorage.getItem("userId");
                let tokenId = sessionStorage.getItem("tokenId");
                if(userId == null || tokenId === null){
                    return;
                }

                let queryDto = {
                    userId:userId,
                    articleType:1,
                    sortBy:1,
                    page:page,
                    tokenId:tokenId
                };

                this.axios.post("getSimpleList",queryDto).then(function (resp) {
                    if(resp.code === 0){
                        this.noteList = [];
                        for(let i = 0; i< resp.data.articleList.length;i++){
                            let note = resp.data.articleList[i];
                            this.noteList.push({
                                noteId:note.articleId,
                                title:note.title,
                                deleteStatus:note.deleteStatus,
                                userId:note.userId,
                                createTime:this.addoileUtil.formatUnixTime(note.createTime)
                            });
                        }
                        this.totalCount = resp.data.totalCount;
                    }
                }.bind(this));

            },
            clearContent(){
                this.content = '';
                this.title = '';
                this.noteBusinessId = '';
            },
            changePage(value){
                let page = {
                    pageSize:10,
                    pageNo:(value -1) * 10
                };
                this.initUserNotes(page);
            },
            handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
                // An example of using FormData
                // NOTE: Your key could be different such as:
                // formData.append('file', file)
                let formData = new FormData();
                formData.append("image", file);

                this.axios({
                    url: this.uploadImage,
                    method: "POST",
                    data: formData
                })
                    .then(result => {
                        console.log(result);
                        let url = result.data.url; // Get url from response
                        Editor.insertEmbed(cursorLocation, "image", url);
                        resetUploader();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        },
        computed: {

        },
        created() {

        },
        mounted() {
            let page = {
                pageSize:10,
                pageNo:0
            };
            this.initUserNotes(page);
        }
    }
</script>

<style scoped>

</style>