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
                        let queryDto = {
                            businessId:questionId
                        };
                        _this.axios.post("deleteByQuestionId",queryDto).then(function (response) {
                            let resp = response.data;
                            if(resp.code == 0 && resp.data > 0){
                                _this.questionsList.splice(tableIndex,1);
                                this.$store.commit('deleteSuccess',_this);
                            }else {
                                this.$store.commit('deleteFailed',_this);
                            }
                        }.bind(_this));
                    }
                };
                this.$Modal.confirm(config);
            },
            initQuestionList(){
                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }

                let queryDto = {
                    userId:userId
                };

                this.axios.post("getQuestionsByUserId",queryDto).then(function (response) {
                    let resp = response.data;
                    if(resp.code == 0){
                        for(let i = 0; i< resp.data.length;i++){
                            let question = resp.data[i];
                            this.questionsList.push({
                                questionId:question.questionId,
                                content:question.content,
                                userId:question.userId,
                                createTime:this.addoileUtil.formatUnixTime(question.createTime)
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