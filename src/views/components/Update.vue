<style scoped lang="less">
    p {
        font-size: 17px;
    }
</style>
<template>
    <div>
        <Card shadow>
            <p slot="title">V1.3.5(20180127)</p>
            <div>
                <h4>优化:</h4>
                <p>&nbsp;&nbsp;·&nbsp;网站字体大小统一</p>
                <p>&nbsp;&nbsp;·&nbsp;’经历分享’改为’分享’,感觉更贴切一点</p>
                <p>&nbsp;&nbsp;·&nbsp;首页图片支持多张,欢迎大家投稿至yangrunkang53@gmail.com</p>
                <p>&nbsp;&nbsp;·&nbsp;添加网站域名解释</p>
                <p>&nbsp;&nbsp;·&nbsp;导航栏不显示用户名,改为‘用户中心’</p>
                <p>&nbsp;&nbsp;·&nbsp;用户中心将以前的[不公开][草稿]换成&nbsp;标签显示</p>
                <p>&nbsp;&nbsp;·&nbsp;去除每个页面中重复和多余组件</p>
            </div>
        </Card>
        <br />
        <Card shadow>
            <p slot="title">V1.3</p>
            <div>
                <h4>新增:</h4>
                <p>&nbsp;&nbsp;·&nbsp;增添论坛页面,第一版较为简单</p>
                <p>&nbsp;&nbsp;·&nbsp;用户管理页面支持文章预览</p>
                <p>&nbsp;&nbsp;·&nbsp;经历分享页面改版,所有的经历内容点击后展示独立阅读页面</p>
                <p>&nbsp;&nbsp;·&nbsp;首页改版,更新为展示推荐内容</p>
                <p>&nbsp;&nbsp;·&nbsp;添加更新日志页面,可以看到每次的更新内容</p>
                <p>&nbsp;&nbsp;·&nbsp;注册登录框下添加[未收到邮件请反馈]入口</p>
                <p>&nbsp;&nbsp;·&nbsp;首页热门动弹滚动效果</p>
                <p>&nbsp;&nbsp;·&nbsp;页面某个地方有彩蛋哦</p>
                <h4>优化:</h4>
                <p>&nbsp;&nbsp;·&nbsp;加载文章时,提示正在加载</p>
                <p>&nbsp;&nbsp;·&nbsp;未登录注册成功前显示请稍等</p>
                <p>&nbsp;&nbsp;·&nbsp;分页无数据时,登录/注册时,页面提示相关信息</p>
                <p>&nbsp;&nbsp;·&nbsp;文章入库时,显示操作提示</p>
                <p>&nbsp;&nbsp;·&nbsp;所有页面优化,去除沉重代码,减少请求次数</p>
                <h4>修复:</h4>
                <p>&nbsp;&nbsp;·&nbsp;再一次修复导航栏在部分浏览器中不居中的问题</p>
                <p>&nbsp;&nbsp;·&nbsp;修复用户管理部分内容未按照时间倒叙排列Bug</p>
            </div>
        </Card>
        <br />
        <Card shadow>
            <p slot="title">V1.2</p>
            <div>
                <h4>新增/优化:</h4>
                <p>&nbsp;&nbsp;·&nbsp;独立出油站编辑器</p>
                <p>&nbsp;&nbsp;·&nbsp;调整部分页面排版</p>
                <p>&nbsp;&nbsp;·&nbsp;文章可以保存为草稿</p>
                <p>&nbsp;&nbsp;·&nbsp;精简前端代码-访问更快</p>
                <p>&nbsp;&nbsp;·&nbsp;支持文章是否公开</p>
                <p>&nbsp;&nbsp;·&nbsp;后端服务整体优化(BigVersion)</p>
                <h4>修复:</h4>
                <p>&nbsp;&nbsp;·&nbsp;修复验证码验证时正好撞到清除操作</p>
            </div>
        </Card>
        <br />
        <Card shadow>
            <p slot="title">V1.1</p>
            <div>
                <h4>新增/优化:</h4>
                <p>&nbsp;&nbsp;·&nbsp;新增用户中心页面,统一管理自己的内容</p>
                <p>&nbsp;&nbsp;·&nbsp;经历分享/IT技术分享支持编辑功能</p>
                <p>&nbsp;&nbsp;·&nbsp;用户登录/注册邮箱验证码验证</p>
                <p>&nbsp;&nbsp;·&nbsp;用户密码忘记重设功能</p>
                <p>&nbsp;&nbsp;·&nbsp;新增完整底栏,添加备案号,联系方式</p>
                <p>&nbsp;&nbsp;·&nbsp;新增分页功能</p>
                <p>&nbsp;&nbsp;·&nbsp;用户网站结构,更加合理清晰</p>
                <p>&nbsp;&nbsp;·&nbsp;用户界面调整</p>
                <p>&nbsp;&nbsp;·&nbsp;前后端服务优化,提高网站加载速度</p>
                <p>&nbsp;&nbsp;·&nbsp;部分耗时操作,例如邮箱验证,优化用户体验</p>
                <h4>修复:</h4>
                <p>&nbsp;&nbsp;·&nbsp;修复部分内容过长为自动换行Bug</p>
                <p>&nbsp;&nbsp;·&nbsp;修复导航栏在部分浏览器不居中显示的Bug</p>
                <p>&nbsp;&nbsp;·&nbsp;修复疯狂点击造成列表递增的Bug</p>
                <p>&nbsp;&nbsp;·&nbsp;修复梦想墙字数多排版乱Bug</p>
                <p>&nbsp;&nbsp;·&nbsp;修复部分邮箱验证Bug</p>
                <p>&nbsp;&nbsp;·&nbsp;修复文章中包含代码展示问题</p>
            </div>
        </Card>
        <br />
        <Card shadow>
            <p slot="title">V1.0&nbsp;网站第一版</p>
            <p>&nbsp;&nbsp;经过国庆没日没夜的疯狂码字,网站终于上线了，www.addoiles.com网站第一次和大家见面,算是比较正式的第一版V1.0</p>
            <p>&nbsp;&nbsp;网站域名:www.addoiles.com</p>
            <p>&nbsp;&nbsp;域名来历:加(add)油(oil) ,多加点油(es) ，addoiles</p>
            <p>&nbsp;&nbsp;做这个网站的初衷: 生活总有很多的不易，我想做一个可以分享你的经历，把你的疑问提出来，也可以发表热门(动弹),或者在网站许下你的梦想(无名)的网站</p>
            <p>&nbsp;&nbsp;网站兼容:Chrome,Firefox,搜狗浏览器,Microsoft Edge（只测试了这几个）,移动端不支持</p>
            <p></p>
            <p>该网站暂定5个页面分别为:</p>
            <p>1. 主页,包含</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;热门动弹: 发你想发的任何内容,任何人都可以发送</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;问答区域: 可以提问,如果有访客过来，可以看到，如果有意，访客可以回答</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;图片轮播区域: 主要放那，好看的</p>
            <p></p>
            <p>2. 梦想墙</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;写下你的梦想，并为之努力,任何人都可以发。梦想多了，会特别好看</p>
            <p></p>
            <p>3.经历分享</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;可以在这里分享你的独一无二的经历，梦想底下有供讨论和打分区域</p>
            <p>4.IT技术</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;因为我是做技术的，这个就是准备作为一个技术专栏，分享技术</p>
            <p>5.聊天机器人</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;任何人都可以过来和机器人聊天(匿名),任何人都可以聊天的哦</p>
        </Card>
    </div>
</template>
<script>

</script>