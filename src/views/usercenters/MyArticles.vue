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
                        title:"小标题",
                        key:"subTitle"
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
                Cookies.set("editArticleIdFromUserCenter",articleId);
                this.$router.push('/ITTech');
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
                        _this.axios.get("deleteByArticleId",{
                            params:{articleId:articleId}
                        }).then(function (response) {
                            let resp = response.data;
                            if(resp.code == 0 && resp.data > 0){
                                _this.articleList.splice(tableIndex,1);
                            }
                        }.bind(_this));
                    }
                };
                this.$Modal.confirm(config);
            },
            initITArticleList(){
                let userId = this.getUserId();
                if(userId == null){
                    return;
                }

                this.axios.get("getArticlesByUserId",{
                    params:{
                        userId:userId,
                        articleType:2
                    }
                }).then(function (response) {
                    let resp = response.data;
                    if(resp.code == 0){
                        for(let i = 0; i< resp.data.length;i++){
                            let article = resp.data[i];
                            this.articleList.push({
                                articleId:article.articleId,
                                title:article.title,
                                subTitle:article.subTitle,
                                userId:article.userId,
                                createTime:this.addoileUtil.formatUnixTime(article.createTime)
                            });
                        }
                    }
                }.bind(this));
            },
            getUserId(){
                let userId = sessionStorage.getItem("userId");
                if(!this.addoileUtil.validateReq(userId)){
                    this.$Notice.info({
                        desc: '<h6>Hi,您还未登录,请登录</h6>'
                    });
                    return;
                }
                return userId;
            }
        }
    }
</script>

<style scoped>

</style>