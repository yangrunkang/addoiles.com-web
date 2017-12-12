<template>
    <div>
        <Table border :columns="articleColumns" :data="articleList"></Table>
    </div>
</template>

<script>
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
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            //do nothing
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
            initITArticleList(){
                this.axios.get("getArticlesByUserId",{
                    params:{
                        userId:"f21d04e26b7347f4a3484746aa846672",
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
                                createTime:article.createTime
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