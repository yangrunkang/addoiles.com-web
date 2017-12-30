<template>
    <div>
        <Table border :columns="experienceColumns" :data="experienceList"></Table>
    </div>
</template>

<script>

    import Cookies from 'js-cookie';

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
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '编辑'),
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
            /**
             * 编辑
             * */
            edit(tableIndex){
                let experienceId = this.experienceList[tableIndex].experienceId;

                let editObj = {
                    businessId:experienceId,
                };

                sessionStorage.setItem("editObj",JSON.stringify(editObj));

                this.$router.push("/OilEditor");
            },
            /**
             * 移除文章
             * */
            remove(tableIndex){
                let experienceId = this.experienceList[tableIndex].experienceId;
                let _this = this;
                let config = {
                    content:'确定删除吗?',
                    okText:'确认',
                    onOk(){
                        let queryDto = {
                            businessId:experienceId
                        };
                        _this.axios.post("deleteArticle",queryDto).then(function (response) {
                            let resp = response.data;
                            if(resp.code == 0 && resp.data > 0){
                                _this.experienceList.splice(tableIndex,1);
                                this.$store.commit('deleteSuccess',_this);
                            }else {
                                this.$store.commit('deleteFailed',_this);
                            }
                        }.bind(_this));
                    }
                };
                this.$Modal.confirm(config);
            },
            initExperienceList(){
                this.$store.commit('validateLogin',this);

                let userId = sessionStorage.getItem("userId");
                if(userId == null){
                    return;
                }

                let queryDto = {
                    userId:userId,
                    articleType:0
                };

                this.axios.post("getSimpleList",queryDto).then(function (response) {
                    let resp = response.data;
                    if(resp.code == 0){
                        for(let i = 0; i< resp.data.length;i++){
                            let experience = resp.data[i];
                            this.experienceList.push({
                                experienceId:experience.articleId,
                                title:this.addoileUtil.isDraft(experience.deleteStatus) + experience.title,
                                userId:experience.userId,
                                rates:experience.rates,
                                createTime:this.addoileUtil.formatUnixTime(experience.createTime)
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