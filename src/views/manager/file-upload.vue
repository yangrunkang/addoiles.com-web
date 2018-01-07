<style lang="less">
    @import "../../styles/common.css";
    @import 'upload.less';
</style>


<template>
    <div>
        <Card>
            <Upload
                    accept="image/*"
                    action="http://localhost:8081/addoiles.com/addFirstPage">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                <p>action 后的连接要加http://</p>
            </Upload>
        </Card>
    </div>
</template>

<script>
export default {
    name: 'file-upload',
    data () {
        return {

        };
    },
    methods: {

    },
    mounted () {

    }
};
</script>
