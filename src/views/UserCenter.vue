<style scoped lang="less">
    @import "../styles/common.css";
</style>
<template>
    <div>
        <Row :gutter="16">
            <i-col span="6">
                <Affix :offset-top="50">
                    <Card shadow>
                        <h3>用户资料</h3>
                        <div>
                            <!--<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />-->
                            <Alert>姓名:{{userName}}</Alert>
                            <Alert>邮箱:{{email}}</Alert>
                        </div>
                    </Card>
                    <br />
                    <Card shadow>
                        <h3>我的</h3>
                        <div>
                            <Menu width="auto" @on-select="routerPush">
                                <MenuItem name="/MyDreams">美好梦想</MenuItem>
                                <MenuItem name="/MyExperience">分享</MenuItem>
                                <MenuItem name="/MyITArticles">技术文章</MenuItem>
                                <MenuItem name="/MyQuestions">问题疑惑</MenuItem>
                                <MenuItem name="/MyHots">热门动弹</MenuItem>
                                <!--暂时不做                            <MenuItem name="/MyLogs">网站活动</MenuItem>-->
                            </Menu>
                        </div>
                    </Card>
                </Affix>
            </i-col>
            <i-col span="18">
                <Card shadow>
                    <router-view></router-view>
                </Card>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                userId: '',
                userName: '',
                email: '',
            }
        },
        methods: {
            /**
             * 初始化用户信息
             */
            initUserInfo() {
                this.userName = sessionStorage.getItem("userName");
                this.email = Cookies.get("email");
                this.userId = sessionStorage.getItem("userId");
            },
            routerPush(name) {
                this.$router.push(name);
            }

        },
        computed: {},
        mounted() {
            this.initUserInfo();
            this.routerPush("/UserCenterPage");
        }
    }
</script>