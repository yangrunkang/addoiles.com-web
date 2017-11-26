<style scoped lang="less">
    @import "../styles/common.css";
</style>
<template>
    <div class="main-content">
        编辑
        <Button  @click="editBtn">许下</Button>
        <!--使用组件就使用v-bind-->
        <vue-quill-editor v-bind:editorContent="content"></vue-quill-editor>
    </div>
</template>
<script>
    //导入编辑器组件
    import vueQuillEditor from './components/editor/vue-quill-editor.vue';
    export default {
        data () {
            return {
              content:'杨润康4567'
            }
        },
        methods: {
            editBtn(){
                console.log(this.content);
                this.content = "<h1>877</h1>";
            }
        },
        mounted() {
          
        },

        components:{
            vueQuillEditor
        }
    }
</script>