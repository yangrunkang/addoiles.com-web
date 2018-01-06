<style lang="less">
    @import "../../styles/common.css";
    @import 'upload.less';
</style>


<template>
    <div>
        <Card>
            <Upload action="localhost:8081/addoiles.com/addFirstPage">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
        </Card>
    </div>
</template>

<script>
export default {
    name: 'file-upload',
    data () {
        return {
            uploadList: []
        };
    },
    methods: {

    },
    mounted () {

    }
};
</script>
