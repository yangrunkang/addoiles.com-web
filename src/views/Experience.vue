<style scoped lang="less">
    @import "../styles/common.css";
    .time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }
</style>
<template>
    <div class="content">


        <Card id="showEditor">
            <p slot="title">分享你的经历,不论是否精彩</p>
            <!--https://surmon-china.github.io/vue-quill-editor -->
            <quill-editor ref="myTextEditor"
                          v-model="content"
                          :config="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
        </Card>

        已分享的经历列表
        <!--经历-->
        <Collapse v-model="value2" accordion>
            <Panel name="1">
                史蒂夫·乔布斯
                <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
            </Panel>
            <Panel name="2">
                斯蒂夫·盖瑞·沃兹尼亚克
                <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
            </Panel>
            <Panel name="3">
                乔纳森·伊夫
                <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
            </Panel>
        </Collapse>
    </div>
</template>
<script>

    var firstFocusEditor = false;

    export default {
    data () {
        return {
            content: "<h1><strong style='color: rgb(102, 163, 224);'>分享不一样的经历，共勉</strong></h1><p><span style='color: rgb(102, 163, 224);'>不放弃,不抛弃,追梦之路,不孤单</span></p>",
            editorOption: {
                // something config

            }
        }
    },
    // if you need to manually control the data synchronization, parent component needs to explicitly emit an event instead of relying on implicit binding
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
        onEditorBlur(editor) {
            //console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {

            if(!firstFocusEditor){
                this.content = "";
                firstFocusEditor = true;
            }

        },
        onEditorReady(editor) {
            //console.log('editor ready!', editor)
        },
        onEditorChange({ editor, html, text }) {
            // console.log('editor change!', editor, html, text)
            this.content = html
        }

    },
    // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
    // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor
        }
    },
    mounted() {
        // you can use current editor object to do something(editor methods)
        //console.log('this is my editor', this.editor)
        // this.editor to do something...

    }
}
</script>