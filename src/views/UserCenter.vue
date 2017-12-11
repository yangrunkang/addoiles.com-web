<style scoped lang="less">
    @import "../styles/common.css";

</style>
<template>
    <div>
        <Row :gutter="16">
            <i-col span="6">
               <Card>
                   <div>用户资料</div>
                   <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                   <p>姓名:Test</p>
                   <p>邮箱:Test@qq.com</p>
                   <Menu>
                       <div class="layout-logo"></div>
                       <div class="layout-nav">
                           <MenuItem name="1">
                               <Icon type="ios-navigate"></Icon>
                               发表的动弹
                           </MenuItem>
                           <MenuItem name="2">
                               <Icon type="ios-keypad"></Icon>
                               提问的问题
                           </MenuItem>

                           <MenuItem name="3">
                               <Icon type="ios-analytics"></Icon>
                               分享的经历
                           </MenuItem>

                           <MenuItem name="3">
                               <Icon type="ios-analytics"></Icon>
                               分享的技术
                           </MenuItem>

                           <MenuItem name="4">
                               <Icon type="ios-analytics"></Icon>
                               分享的经历
                           </MenuItem>

                           <MenuItem name="5">
                               <Icon type="ios-analytics"></Icon>
                               你的梦想
                           </MenuItem>

                           <MenuItem name="6">
                               <Icon type="ios-paper"></Icon>
                               日志线
                           </MenuItem>
                       </div>
                   </Menu>
               </Card>
            </i-col>
            <i-col span="18">
                <Card>
                    展示具体的信息
                    <Table stripe :columns="columns1" :data="data1"></Table>
                </Card>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import ICol from "iview/src/components/grid/col";
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods: {

        },
        computed: {

        },
        mounted () {

        }
    }
</script>