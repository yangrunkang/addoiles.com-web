<template>
    <div>
        <Table border :columns="articleColumns" :data="articleList"></Table>
        <Page :total="totalCount" @on-change="changePage" show-total style="text-align: right;"></Page>

        <!--查看模态框-->
        <Modal width="1140"
               v-model="showModal"
               :styles="{top: '20px'}"
               :closable="true"
               :mask-closable="false"
               :transition-names="['fade','ease']"
        >
            <p slot="header">
                <strong>{{title}}</strong>
            </p>
            <div class="ql-snow">
                <div class="ql-editor">
                    <p class="web-content-font-size auto-break-line" v-html="content"></p>
                </div>
            </div>
            <div slot="footer">
                <p style="text-align: center;font-weight: bold">来自油站:Show Yourself</p>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "my-articles",
        data() {
            return {
                title:'',
                content:'',
                //总数
                totalCount:0,
                showModal:false,
                articleColumns:[
                    {
                        title:"状态",
                        key:"status",
                        render (h, params) {
                            let row = params.row;
                            if(row.deleteStatus === 2 && row.isHide === 1){
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type:'dot',
                                            color: 'red'
                                        },
                                    }, '不公开'),
                                    h('Tag', {
                                        props: {
                                            type:'dot',
                                            color: 'yellow'
                                        },
                                    }, '草稿')
                                ]);
                            }
                            if(row.deleteStatus === 2){
                                return h('Tag', {
                                    props: {
                                        type:'dot',
                                        color: 'yellow'
                                    },
                                }, '草稿');
                            }
                            if(row.isHide === 1){
                                return h('Tag', {
                                    props: {
                                        type:'dot',
                                        color: 'red'
                                    },
                                }, '不公开');
                            }

                            return h('Tag', {
                                props: {
                                    type:'dot',
                                    color: 'green'
                                },
                            }, '正常');
                        }
                    },
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
                articleList:[]
            }
        },
        mounted() {
            let page = {
                pageSize:10,
                pageNo:0
            };
            this.initITArticleList(page);
        },
        methods:{
            /**
             * 查看
             * */
            view(tableIndex){
                let articleId = this.articleList[tableIndex].articleId;

                let queryDto = {
                    businessId : articleId,
                    tokenId: sessionStorage.getItem("tokenId")
                };
                this.showModal = true;
                this.axios.post('getArticleByBusinessId',queryDto).then(function (resp) {
                    let db_return_data = resp.data.data;
                    if(resp.data.code === 0 && db_return_data != null){
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
                    content:'确定要删除【'+this.articleList[tableIndex].title+'】这篇来之不易的技术文章吗?',
                    okText:'确认',
                    onOk(){
                        let queryDto = {
                            businessId:articleId
                        };
                        _this.axios.post("deleteArticle",queryDto).then(function (response) {
                            let resp = response.data;
                            if(resp.code === 0 && resp.data > 0){
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
            initITArticleList(page){
                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }
                let queryDto = {
                    userId:userId,
                    articleType:2,
                    page:page
                };

                this.axios.post("getSimpleList",queryDto).then(function (response) {
                    let resp = response.data;
                    if(resp.code === 0){
                        this.articleList = [];
                        for(let i = 0; i< resp.data.articleList.length;i++){
                            let article = resp.data.articleList[i];
                            this.articleList.push({
                                articleId:article.articleId,
                                title:article.title,
                                deleteStatus:article.deleteStatus,
                                isHide:article.isHide,
                                userId:article.userId,
                                createTime:this.addoileUtil.formatUnixTime(article.createTime)
                            });
                        }
                        this.totalCount = resp.data.totalCount;
                    }
                }.bind(this));
            },
            changePage(value){
                let page = {
                    pageSize:10,
                    pageNo:(value -1) * 10
                };
                this.initITArticleList(page);
            }
        }
    }
</script>

<style scoped>

</style>