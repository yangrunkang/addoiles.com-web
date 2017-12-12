<template>
    <div>
        <Table border :columns="questionsColumns" :data="questionsList"></Table>
    </div>
</template>

<script>
    export default {
        name: "my-questions",
        data() {
            return {
                questionsColumns:[
                    {
                        title:"问题",
                        key:"content"
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
                questionsList:[]
            }
        },
        mounted() {
            this.initQuestionList();
        },
        methods:{
            initQuestionList(){
                this.axios.get("getQuestionsByUserId",{
                    params:{
                        userId:"f21d04e26b7347f4a3484746aa846672"
                    }
                }).then(function (response) {
                    let resp = response.data;
                    if(resp.code == 0){
                        for(let i = 0; i< resp.data.length;i++){
                            let question = resp.data[i];
                            this.questionsList.push({
                                questionId:question.questionId,
                                content:question.content,
                                userId:question.userId,
                                createTime:question.createTime
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