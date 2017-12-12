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
                let userId = this.getUserId();
                if(userId == null){
                    return;
                }

                this.axios.get("getExperienceByUserId",{
                    params:{userId:userId}
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