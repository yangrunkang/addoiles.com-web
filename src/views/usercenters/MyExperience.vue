<template>
    <div>
        <Table border :columns="experienceColumns" :data="experienceList"></Table>
    </div>
</template>

<script>
    export default {
        name: "my-experience",
        data() {
            return {
                experienceColumns:[
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
                experienceList:[]
            }
        },
        mounted() {
            this.initExperienceList();
        },
        methods:{
            remove(tableIndex){
                let experienceId = this.experienceList[tableIndex].experienceId;
                let _this = this;
                let config = {
                    content:'确定删除吗?',
                    okText:'确认',
                    onOk(){
                        _this.axios.get("deleteByExperienceId",{
                            params:{experienceId:experienceId}
                        }).then(function (response) {
                            let resp = response.data;
                            if(resp.code == 0 && resp.data > 0){
                                _this.experienceList.splice(tableIndex,1);
                            }
                        }.bind(_this));
                    }
                };
                this.$Modal.confirm(config);
            },
            initExperienceList(){
                this.axios.get("getExperienceByUserId",{
                    params:{userId:"f21d04e26b7347f4a3484746aa846672"}
                }).then(function (response) {
                    let resp = response.data;
                    if(resp.code == 0){
                        for(let i = 0; i< resp.data.length;i++){
                            let experience = resp.data[i];
                            this.experienceList.push({
                                experienceId:experience.experienceId,
                                title:experience.title,
                                userId:experience.userId,
                                rates:experience.rates,
                                createTime:experience.createTime
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