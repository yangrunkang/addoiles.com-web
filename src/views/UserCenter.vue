<style scoped lang="less">
    @import "../styles/common.css";

</style>
<template>
    <div>
        <Row :gutter="16">
            <i-col span="6">
               <Card>
                   <h3>用户资料</h3>
                   <!--<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />-->
                   <Alert>姓名:{{userName}}</Alert>
                   <Alert>邮箱:{{email}}</Alert>
                   <div >
                       <Menu active-name="1" width="auto" :open-names="['1']">
                           <MenuItem name="1">我的动弹</MenuItem>
                           <MenuItem name="2">我曾经问题</MenuItem>
                           <MenuItem name="3">我的经历 </MenuItem>
                           <MenuItem name="4">我的技术</MenuItem>
                           <MenuItem name="5">我的梦想</MenuItem>
                           <MenuItem name="6">我的活动(日志线)</MenuItem>
                       </Menu>
                   </div>
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
    import Cookies from 'js-cookie';
    export default {
        data () {
            return {
                userId:'',
                userName:'',
                email:'',
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
            /**
             * 初始化用户信息
             */
            initUserInfo(){
                this.userName = Cookies.get("userName");
                this.email = Cookies.get("email");
                this.userId = sessionStorage.getItem("userId");
            }
        },
        computed: {

        },
        mounted () {
            this.initUserInfo();
        }
    }
</script>