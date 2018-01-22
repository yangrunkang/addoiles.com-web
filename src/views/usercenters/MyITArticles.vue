<template>
    <div>
        <Table border :columns="articleColumns" :data="articleList"></Table>

        <!--查看模态框-->
        <Modal width="1140" v-model="showModal" :styles="{top: '20px'}">
            <p slot="header">
                <strong>{{title}}</strong>
            </p>
            <p class="web-content-font-size auto-break-line" v-html="content"></p>

            <div slot="footer">
                <p style="text-align: center;font-weight: bold">来自油站:Show Yourself</p>
            </div>
        </Modal>
    </div>
</template>

<script>

    import Cookies from 'js-cookie';

    export default {
        name: "my-articles",
        data() {
            return {
                title:'',
                content:'',
                showModal:false,
                articleColumns:[
                    {
                        title:"标题",
                        key:"title"
                    },
                    {
                        title:"时间",
                        key:"createTime"
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

                ],
                articleList:[]
            }
        },
        mounted() {
            this.initITArticleList();
        },
        methods:{
            /**
             * 查看
             * */
            view(tableIndex){
                let articleId = this.articleList[tableIndex].articleId;

                let queryDto = {
                    businessId : articleId,
                };
                this.showModal = true;
                this.axios.post('getArticleByBusinessId',queryDto).then(function (resp) {
                    let db_return_data = resp.data.data;
                    if(resp.data.code == 0 && db_return_data != null){
                        // let config = {
                        //     title:db_return_data.title,
                        //     content:db_return_data.content,
                        //     width:832,
                        //     scrollable:false,
                        //     closable:true
                        // };
                        // this.$Modal.info(config);
                        this.title = db_return_data.title;
                        this.content = db_return_data.content;
                    }
                }.bind(this));

            },
            /**
             * 编辑
             * */
            edit(tableIndex){
                let articleId = this.articleList[tableIndex].articleId;
                let editObj = {
                    businessId:articleId,
                };

                sessionStorage.setItem("editObj",JSON.stringify(editObj));

                this.$router.push("/OilEditor");
            },
            /***
             * 删除
             */
            remove(tableIndex){
                let articleId = this.articleList[tableIndex].articleId;
                let _this = this;
                let config = {
                    content:'确定删除吗?',
                    okText:'确认',
                    onOk(){
                        let queryDto = {
                            businessId:articleId
                        };
                        _this.axios.post("deleteArticle",queryDto).then(function (response) {
                            let resp = response.data;
                            if(resp.code == 0 && resp.data > 0){
                                _this.articleList.splice(tableIndex,1);
                                this.$store.commit('deleteSuccess',_this);
                            }else {
                                this.$store.commit('deleteFailed',_this);
                            }
                        }.bind(_this));
                    }
                };
                this.$Modal.confirm(config);
            },
            initITArticleList(){
                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }
                let queryDto = {
                    userId:userId,
                    articleType:2
                };

                this.axios.post("getSimpleList",queryDto).then(function (response) {
                    let resp = response.data;
                    if(resp.code == 0){
                        for(let i = 0; i< resp.data.length;i++){
                            let article = resp.data[i];
                            this.articleList.push({
                                articleId:article.articleId,
                                title:this.addoileUtil.isDraft(article.deleteStatus) + this.addoileUtil.isHide(article.isHide) + article.title,
                                userId:article.userId,
                                createTime:this.addoileUtil.formatUnixTime(article.createTime)
                            });
                        }
                    }
                }.bind(this));
            }
        }
    }
</script>

<style scoped>

</style>