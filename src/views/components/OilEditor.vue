<style scoped lang="less">
    @import "../styles/common.css";
</style>
<template>
    <div>
        <!--未登录时展示-->
        <Alert type="error" class="not-login-tips" v-show="showNotLoginTips">
            请登录后编辑
        </Alert>
        <!--编辑器-->
        <Card class="edit-card">
            <p slot="title" style="height: auto;font-size: 18px">
                <i-input v-model="title" placeholder="标题" size="large" style="width:605px;"></i-input>
                <span style="float: right;">
                        <Button type="info" shape="circle" v-show="editBtn" @click="editExperience()">编辑完成</Button>
                        <Button type="info" shape="circle" v-show="shareBtn" @click="saveExperience('normal')">发表</Button>
                    <!--<Button type="warning" shape="circle" v-show="shareBtn" @click="saveExperience('draft')">保存为草稿</Button>-->
                        <Button type="error" shape="circle" @click="confirmModal = true">清空内容</Button>
                    </span>
            </p>
            <!--https://surmon-china.github.io/vue-quill-editor -->
            <quill-editor ref="myTextEditor"
                          v-model="content"
                          :options="editorOption"
                          class="quill-editor-style">
            </quill-editor>
        </Card>

        <Modal v-model="confirmModal">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>确定要清空吗?</span>
            </p>
            <div style="text-align:center;font-size: 18px">
                <p>如果你写了很多内容,慎重考虑一下.</p>
                <!--<p>或者可以保存为<strong style="color: #ff3300">草稿</strong>下一次可以继续编辑</p>-->
            </div>
            <!--            <div slot="footer">
                            <Button type="info" size="large" long @click="saveExperience('normal')">立即分享</Button>
                        </div>-->
            <!--            <div slot="footer" style="margin: 4px auto;">
                            <Button type="warning" size="large" long @click="saveExperience('draft')">保存为草稿</Button>
                        </div>-->
            <div slot="footer" style="margin: 4px auto;">
                <Button type="error" size="large" long @click="clearContent(true)">坚决删除</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    //编辑器: 统一发表内容编辑内容

    //安装vue-quill-editor富文本编辑器
    import Vue from 'vue';
    import Cookies from 'js-cookie';
    import VueQuillEditor from 'vue-quill-editor';
    Vue.use(VueQuillEditor);
    export default {
        data () {
            return {
                //标题
                title : '',
                //内容
                content : '',
                //编辑器配置
                editorOption: {
                    // something to config
                    placeholder: 'Write Here'

                },
                //确认清除模态框显示与隐藏
                confirmModal : false,
                //未登录分享经历时提示
                showNotLoginTips: false,
                //默认显示分享和保存为草稿按钮,编辑时不显示
                shareBtn: true,
                //默认编辑按钮不显示
                editBtn:false,
            }
        },
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            clearContent(showNotice){
                if(!showNotice) return;
                this.$Notice.success({
                    desc: '遵照您的旨意,已经把内容清空'
                });
            }
        },
        // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，
        // 实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            }
        },
        mounted() {
            /*
                {
                    from : 来源(ITArticle Experience)
                    editId : id(to db to get content)
                }
            */
        }
    }

</script>