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
                                            this.remove(params.index)
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
            remove(tableIndex){
                let questionId = this.questionsList[tableIndex].questionId;
                let _this = this;
                let config = {
                    content:'确定删除吗?',
                    okText:'确认',
                    onOk(){
                        _this.axios.get("deleteByQuestionId",{
                            params:{questionId:questionId}
                        }).then(function (response) {
                            let resp = response.data;
                            if(resp.code == 0 && resp.data > 0){
                                _this.questionsList.splice(tableIndex,1);
                            }
                        }.bind(_this));
                    }
                };
                this.$Modal.confirm(config);
            },
            initQuestionList(){
                let userId = this.getUserId();
                if(userId == null){
                    return;
                }

                this.axios.get("getQuestionsByUserId",{
                    params:{
                        userId:userId
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