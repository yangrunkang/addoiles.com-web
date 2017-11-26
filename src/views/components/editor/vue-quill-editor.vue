<style>

</style>
<template>
    <div id="editor">
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @focus="onEditorFocus($event)" style="height: 350px">
        </quill-editor>
    </div>
</template>
<script>
    import Vue from 'vue';
    //安装vue-quill-editor富文本编辑器
    import VueQuillEditor from 'vue-quill-editor';
    Vue.use(VueQuillEditor);

    export default {
        data () {
            return {
                // 编辑器内容
                content : '',
                //编辑器配置
                editorOption: {
                    // something to config
                    placeholder: '不放弃,不抛弃,追梦之路,时常伴随着孤单\n分享自己不一样的经历,同大家一起加油共勉\n如果可以,请在这里书写您独一无二的人生经历'

                }
            }
        },
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            onEditorFocus(editor) {
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
        }
    }

</script>