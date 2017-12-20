<template>
    <div>
        <Table border :columns="hotsColumns" :data="hotsList"></Table>
    </div>
</template>

<script>
    export default {
        name: "my-hots",
        data() {
            return {
                hotsColumns:[
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
                hotsList:[]
            }
        },
        mounted() {
            this.initHotsList();
        },
        methods:{
            remove(tableIndex){
                let hotId = this.hotsList[tableIndex].hotId;
                let _this = this;
                let config = {
                    content:'确定删除吗?',
                    okText:'确认',
                    onOk(){
                        _this.axios.get("deleteByHotId",{
                            params:{hotId:hotId}
                        }).then(function (response) {
                            let resp = response.data;
                            if(resp.code == 0 && resp.data > 0){
                                _this.hotsList.splice(tableIndex,1);
                            }
                        }.bind(_this));
                    }
                };
                this.$Modal.confirm(config);
            },
            initHotsList(){
                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }

                this.axios.get("getHotsByUserId",{
                    params:{
                        userId:userId
                    }
                }).then(function (response) {
                    let resp = response.data;
                    if(resp.code == 0){
                        for(let i = 0; i< resp.data.length;i++){
                            let hot = resp.data[i];
                            this.hotsList.push({
                                hotId:hot.hotId,
                                title:hot.title,
                                content:hot.content,
                                userId:hot.userId,
                                createTime:this.addoileUtil.formatUnixTime(hot.createTime)
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