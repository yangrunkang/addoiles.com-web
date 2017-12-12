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
                                            this.deleteDream(params.index)
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
             * 删除梦想
             */
            deleteDream(tableIndex){
                console.log("tableIndex:" + tableIndex + ",title:" + this.dreamList[tableIndex].title);
                console.log(this.dreamList[tableIndex].dreamId + "=" + this.dreamList[tableIndex].userId);
            },
            /**
             * 初始化界面
             */
            initDreamList(){
                this.axios.get("getDreamsByUserId",{
                    params:{userId:"no user"}
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
            }
        },
        mounted() {
            this.initDreamList();
        }
    }
</script>

<style scoped>

</style>