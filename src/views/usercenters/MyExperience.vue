<template>
    <div>
        <Table border :columns="experienceColumns" :data="experienceList"></Table>

        <!--查看模态框-->
        <Modal width="1140" v-model="showModal" :styles="{top: '20px'}">
            <p slot="header">
                <strong>{{title}}</strong>
            </p>
            <p class="auto-break-line web-content-font-size" v-html="content"></p>

            <div slot="footer">
                <p style="text-align: center;font-weight: bold">来自油站:不虚度人生,让自己的人生少点遗憾</p>
            </div>
        </Modal>
    </div>
</template>

<script>

    export default {
        name: "my-experience",
        data() {
            return {
                title:'加载中',
                content:'正在加载...请稍等~~',
                showModal:false,
                experienceColumns:[
                    {
                        title:"状态",
                        key:"status",
                        render (h, params) {
                            let row = params.row;
                            if(row.deleteStatus === 2 && row.isHide === 1){
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type:'dot',
                                            color: 'red'
                                        },
                                    }, '不公开'),
                                    h('Tag', {
                                        props: {
                                            type:'dot',
                                            color: 'yellow'
                                        },
                                    }, '草稿')
                                ]);
                            }
                            if(row.deleteStatus === 2){
                                return h('Tag', {
                                    props: {
                                        type:'dot',
                                        color: 'yellow'
                                    },
                                }, '草稿');
                            }
                            if(row.isHide === 1){
                                return h('Tag', {
                                    props: {
                                        type:'dot',
                                        color: 'red'
                                    },
                                }, '不公开');
                            }
                            return h('Tag', {
                                props: {
                                    type:'dot',
                                    color: 'green'
                                },
                            }, '正常');
                        }
                    },
                    {
                        title:"标题",
                        key:"title"
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
                                            this.view(params.index)
                                        }
                                    }
                                }, '查看'),
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
                    {
                        title:"创建时间",
                        key:"createTime"
                    }
                ],
                experienceList:[]
            }
        },
        mounted() {
            this.initExperienceList();
        },
        methods:{
            /**
             * 查看
             * */
            view(tableIndex){
                let experienceId = this.experienceList[tableIndex].experienceId;

                let queryDto = {
                    businessId : experienceId,
                };

                this.showModal = true;
                this.axios.post('getArticleByBusinessId',queryDto).then(function (resp) {
                    let db_return_data = resp.data.data;
                    if(resp.data.code == 0 && db_return_data != null){
                        this.title = db_return_data.title;
                        this.content = db_return_data.content;
                    }
                }.bind(this));

            },
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
                                title:experience.title,
                                deleteStatus:experience.deleteStatus,
                                isHide:experience.isHide,
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