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
                    {
                        title:"创建时间",
                        key:"createTime"
                    }
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
                    content:'确定要放弃【'+ this.dreamList[tableIndex].title +'】 这个梦想吗?',
                    okText:'确认',
                    onOk(){
                        let queryDto = {
                            businessId:dreamId,
                            userId: sessionStorage.getItem("userId"),
                            tokenId: sessionStorage.getItem("tokenId")
                        };
                        _this.axios.post("deleteMicroContent",queryDto).then(function (resp) {
                            if(resp.code === 0 && resp.data > 0){
                                _this.dreamList.splice(tableIndex,1);
                                this.$store.commit('deleteSuccess',_this);
                            }else {
                                this.$store.commit('deleteFailed',_this);
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

                let queryDto = {
                    userId:sessionStorage.getItem("userId"),
                    microType:1,
                    tokenId: sessionStorage.getItem("tokenId")
                };

                this.axios.post("getMicroContentList",queryDto).then(function (resp) {
                    if(resp.code === 0){
                        for(let i = 0; i< resp.data.length;i++){
                            let _dream = resp.data[i];
                            this.dreamList.push({
                                title:_dream.title,
                                content:_dream.content,
                                createTime:this.addoileUtil.formatUnixTime(_dream.createTime),
                                userId:_dream.userid,
                                dreamId:_dream.microId
                            });
                        }
                    }
                }.bind(this));
            }
        },
        mounted() {
            this.initDreamList();
        }
    }
</script>

<style scoped>

</style>