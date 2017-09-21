<style scoped lang="less">
    @import "../styles/common.css";
</style>
<template>
    <div class="main-content">
        <!--todo for循环 每行Card有间隔,大小相等-->
        <Row>
            <Col span="8">
                <Card :bordered="true">
                    <p slot="title" style="height: auto;padding-bottom: 2px">
                        <Input v-model="value13" placeholder="写下你的梦想">
                        <Button slot="append">许下</Button>
                        </Input></p>
                    <p>
                        <Input v-model="value6" type="textarea" :rows="4" placeholder="例如:我的梦想是实现自己的价值,做自己喜欢做的事情"></Input>
                    </p>
                </Card>
            </Col>

            <Col span="8">
                <Card :bordered="true">
                    <p slot="title">看更多的书</p>
                    <p>
                        读书使人进步
                    </p>
                </Card>
            </Col>

            <Col span="8">
                <Card :bordered="true">
                    <p slot="title">见更多的人</p>
                    <p>
                       旅行使人豁达
                    </p>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>

</script>