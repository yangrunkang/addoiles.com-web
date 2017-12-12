<template>
    <div>
        <Table border :columns="dreamColumns" :data="dreamList"></Table>
    </div>
</template>

<script>
    export default {
        name: "my-dreams",
        data() {
            return {
                dreamColumns:[
                    {
                        title:"标题",
                        key:"title"
                    },
                    {
                        title:"内容",
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
                dreamList:[]
            }
        },
        methods:{
            /**
             * 删除
             */
            remove(tableIndex){
                let dreamId = this.dreamList[tableIndex].dreamId;
                let _this = this;
                let config = {
                    content:'确定删除吗?',
                    okText:'确认',
                    onOk(){
                        _this.axios.get("deleteByDreamId",{
                            params:{dreamId:dreamId}
                        }).then(function (response) {
                            let resp = response.data;
                            if(resp.code == 0 && resp.data > 0){
                                _this.dreamList.splice(tableIndex,1);
                            }
                        }.bind(_this));
                    }
                };
                this.$Modal.confirm(config);
            },
            /**
             * 初始化界面
             */
            initDreamList(){
                let userId = this.getUserId();
                if(userId == null){
                    return;
                }

                this.axios.get("getDreamsByUserId",{
                    params:{userId:userId}
                }).then(function (response) {
                    let resp = response.data;
                    if(resp.code == 0){
                        for(let i = 0; i< resp.data.length;i++){
                            let _dream = resp.data[i];
                            this.dreamList.push({
                                title:_dream.title,
                                content:_dream.content,
                                createTime:_dream.createTime,
                                userId:_dream.userid,
                                dreamId:_dream.dreamId
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
        },
        mounted() {
            this.initDreamList();
        }
    }
</script>

<style scoped>

</style>