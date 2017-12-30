<template>
    <div>
        <Table border :columns="articleColumns" :data="articleList"></Table>
    </div>
</template>

<script>

    import Cookies from 'js-cookie';

    export default {
        name: "my-articles",
        data() {
            return {
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
                                title:this.addoileUtil.isDraft(article.deleteStatus) + article.title,
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