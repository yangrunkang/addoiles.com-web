<style scoped lang="less">
    li {
        font-size: 15px;
    }

    ul {
        padding-left: 20px;
    }

    li {
        margin-bottom: 12px;
    }

    h4 {
        margin-bottom: 12px;
    }

    .wy {
        text-align: center;
    }

</style>
<template>
    <div>
        <p @click="$store.commit('toJianLi',window)"><Card :bordered="false" >👉个人简历</Card></p>
        <br />
        <Card>
            <p slot="title" style="font-size:17px; font-weight: bolder; color: #716769">电台《程序员的生活记录》  目前在网易云音乐/网易云电台,荔枝FM,喜马拉雅,苹果播客可获得收听</p>
            <p class="wy">
                <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=450
                        src="//music.163.com/outchain/player?type=4&id=341445058&auto=1&height=430"></iframe>
            </p>
            <br />
            <p style="text-align: right"><a style="color: #9ea7b4;" target="_blank" href="https://t.me/coderLifeLog">《程序员的生活记录》电报(Telegram)讨论组</a></p>
            <br />
        </Card>
        <br/>
        <Card>
            <h4>v1.5.5</h4>
            <ul>
                <li>技术沉淀文章展示部分使用局部单独view呈现</li>
            </ul>
            <Card>
                <h4>v1.5.8</h4>
                <ul>
                    <li><a @click="$store.commit('toJianLi',window)">添加个人简历</a></li>
                </ul>
            </Card>
            <br/>
            <Card>
                <h4>v1.5.7</h4>
                <ul>
                    <li>移除[技术沉淀]页面 [获取分享] 按钮</li>
                </ul>
            </Card>
            <br/>
            <Card>
                <h4>v1.5.6修复</h4>
                <ul>
                    <li>修复页面导航栏缓存问题,点击无效Bug</li>
                </ul>
            </Card>
            <br />
            <Card>
                <h4>v1.5.5修复</h4>
                <ul>
                    <li>修复重复点击【IT技术】导航按钮导致技术文章详情内容页面空白</li>
                </ul>
            </Card>
        </Card>
        <br/>
        <Card>
            <h4>2019年06月14日 加载速度优化</h4>
            <ul>
                <li>压缩网页,提高网页加载速度</li>
            </ul>
        </Card>
        <br/>
        <Card>
        <h4>2019年06月11日 公共工具服务</h4>
        <ul>
            <li><a href="http://www.addoiles.com:8109">公共工具服务</a></li>
            <ul>
                <li>时间戳转化</li>
                <li>json格式化</li>
                <li>行转列处理</li>
            </ul>
        </ul>
        </Card>
        <br/>
        <Card>
            <h4>付费问答</h4>
            <ul>
                <li><a href="https://segmentfault.com/u/yangrunkang">思否:https://segmentfault.com/u/yangrunkang</a></li>
            </ul>
        </Card>
        <br/>
        <Card>
            <p slot="title">v1.5.4</p>
            <h4>优化:</h4>
            <ul>
                <li>用户登陆后,移除经历分享页面/IT技术页面的编辑按钮,统一编辑入口在[用户中心]</li>
                <li>移除经历分享页面[获得评分]信息</li>
                <li>部分页面优化,电台页面</li>
            </ul>
        </Card>
        <br/>
        <Card>
            <p slot="title">v1.5.3</p>
            <h4>优化:</h4>
            <ul>
                <li>去除邮箱验证,改为页面验证码(使用QQ邮箱有限制,发多了就不让发了)</li>
            </ul>
        </Card>
        <br/>
        <Card>
            <p slot="title">2019</p>
            <h4>新年快乐~ 感谢大家一直以来的关注</h4>
        </Card>
        <br/>
        <Card>
            <p slot="title">V1.5.2</p>
            <h4>新增:</h4>
            <ul>
                <li>用户登录后,用户中心展示用户最近活动信息</li>
                <li>更换新的编辑器</li>
                <li>添加<a href="support" style="color: #1c2438">支持一下</a>页面</li>
            </ul>
            <h4>优化:</h4>
            <ul>
                <li>小记客栈编辑后可以继续编辑</li>
                <li>
                    更改荔枝FM电台到<a href="http://music.163.com/#/djradio?id=341445058" target="_blank"
                                style="color: #1c2438">网易云音乐电台</a>
                </li>
                <li>页面细节调整</li>
                <li>未登录自动跳转登录页面</li>
            </ul>
            <h4>修复:</h4>
            <ul>
                <li>修复编辑器code-block代码块每次编辑时自动插入空行问题</li>
                <li>修复编辑器输入首字母无效问题</li>
                <li>修复编辑器格式丢失问题</li>
            </ul>
        </Card>
        <br />
        <Card>
            <p slot="title">V1.5.1</p>
            <h4>新增:</h4>
            <ul>
                <li>编辑文章可以临时保存,专注于文章修改订正</li>
            </ul>
        </Card>
        <br/>
        <Card>
            <p slot="title">V1.5.0</p>
            <h4>新增:</h4>
            <ul>
                <li>分享,IT技术文章支持链接分享</li>
                <li>图片上传支持GIF</li>
            </ul>
            <h4>优化:</h4>
            <ul>
                <li>用户管理文章最近更新内容显示在第一条</li>
                <li>热门动弹滚动速度降低</li>
                <li>图片上传各个阶段优化提示</li>
                <li>文章删除时,展示即将要删除的文章标题</li>
            </ul>
        </Card>
        <br/>
        <Card>
            <p slot="title">V1.4.5</p>
            <h4>新增:</h4>
            <ul>
                <li>用户非公开数据更加安全</li>
                <li>优化文章图片上传及浏览</li>
            </ul>
        </Card>
        <br/>
        <Card>
            <p slot="title">V1.4.0</p>
            <h4>新增:</h4>
            <ul>
                <li>用户管理新增【小记客栈】,方便您记录一些待办事项,日记,随笔等</li>
                <li>用户管理添加分页功能</li>
            </ul>
            <h4>优化:</h4>
            <ul>
                <li>文章展示修改时间</li>
                <li>登录成功立即跳转首页</li>
                <li>热门动弹鼠标移至内容上方,停止滚动</li>
                <li>IT文章添加快速抵达评论区域按钮</li>
                <li>添加网站icon--哈士奇</li>
                <li>点击加载按钮当无内容时禁止点击</li>
            </ul>
            <h4>修复:</h4>
            <ul>
                <li>修复文章中排版与编辑器中样式不一致Bug</li>
                <li>修复文章中图片size过大导致在浏览时图片超过阅读区边界Bug</li>
                <li>修复首页推荐栏未按照推荐先后顺序排列Bug</li>
            </ul>
        </Card>
        <br/>
        <Card>
            <p slot="title">V1.3.5</p>
            <h4>优化:</h4>
            <ul>
                <li>网站字体大小统一</li>
                <li>[经历分享] 改为 [分享],感觉更贴切一点</li>
                <li>网站所有独立阅读区域添加关闭按钮</li>
                <li>分享页面独立阅读区域样式优化</li>
                <li>首页图片支持多张,欢迎大家投稿至yangrunkang53@gmail.com</li>
                <li>添加网站域名解释</li>
                <li>导航栏不显示用户名,改为‘用户中心’</li>
                <li>用户中心将以前的[不公开][草稿]换成标签显示</li>
                <li>去除每个页面中重复和多余组件</li>
            </ul>
        </Card>
        <br/>
        <Card>
            <p slot="title">V1.3</p>
            <h4>新增:</h4>
            <ul>
                <li>增添论坛页面,第一版较为简单</li>
                <li>用户管理页面支持文章预览</li>
                <li>经历分享页面改版,所有的经历内容点击后展示独立阅读页面</li>
                <li>首页改版,更新为展示推荐内容</li>
                <li>添加更新日志页面,可以看到每次的更新内容</li>
                <li>注册登录框下添加[未收到邮件请反馈]入口</li>
                <li>首页热门动弹滚动效果</li>
                <li>页面某个地方有彩蛋哦</li>
            </ul>
            <h4>优化:</h4>
            <ul>
                <li>加载文章时,提示正在加载</li>
                <li>未登录注册成功前显示请稍等</li>
                <li>分页无数据时,登录/注册时,页面提示相关信息</li>
                <li>文章入库时,显示操作提示</li>
                <li>所有页面优化,去除沉重代码,减少请求次数</li>
            </ul>
            <h4>修复:</h4>
            <ul>
                <li>再一次修复导航栏在部分浏览器中不居中的问题</li>
                <li>修复用户管理部分内容未按照时间倒叙排列Bug</li>
            </ul>
        </Card>
        <br/>
        <Card>
            <p slot="title">V1.2</p>
            <h4>新增/优化:</h4>
            <ul>
                <li>独立出油站编辑器</li>
                <li>调整部分页面排版</li>
                <li>文章可以保存为草稿</li>
                <li>精简前端代码-访问更快</li>
                <li>支持文章是否公开</li>
                <li>后端服务整体优化(BigVersion)</li>
            </ul>
            <h4>修复:</h4>
            <ul>
                <li>修复验证码验证时正好撞到清除操作</li>
            </ul>
        </Card>
        <br/>
        <Card>
            <p slot="title">V1.1</p>
            <h4>新增/优化:</h4>
            <ul>
                <li>新增用户中心页面,统一管理自己的内容</li>
                <li>经历分享/IT技术分享支持编辑功能</li>
                <li>用户登录/注册邮箱验证码验证</li>
                <li>用户密码忘记重设功能</li>
                <li>新增完整底栏,添加备案号,联系方式</li>
                <li>新增分页功能</li>
                <li>用户网站结构,更加合理清晰</li>
                <li>用户界面调整</li>
                <li>前后端服务优化,提高网站加载速度</li>
                <li>部分耗时操作,例如邮箱验证,优化用户体验</li>
            </ul>
            <h4>修复:</h4>
            <ul>
                <li>修复部分内容过长为自动换行Bug</li>
                <li>修复导航栏在部分浏览器不居中显示的Bug</li>
                <li>修复疯狂点击造成列表递增的Bug</li>
                <li>修复梦想墙字数多排版乱Bug</li>
                <li>修复部分邮箱验证Bug</li>
                <li>修复文章中包含代码展示问题</li>
            </ul>
        </Card>
        <br/>
        <Card>
            <p slot="title">V1.0网站第一版</p>
            经过国庆没日没夜的疯狂码字,网站终于上线了，www.addoiles.com网站第一次和大家见面,算是比较正式的第一版V1.0
            网站域名:www.addoiles.com
            域名来历:加(add)油(oil) ,多加点油(es) ，addoiles
            做这个网站的初衷: 生活总有很多的不易，我想做一个可以分享你的经历，把你的疑问提出来，也可以发表热门(动弹),或者在网站许下你的梦想(无名)的网站
            网站兼容:Chrome,Firefox,搜狗浏览器,Microsoft Edge（只测试了这几个）,移动端不支持

            该网站暂定5个页面分别为:
            <h3>主页</h3>
            <ul>
                <li>热门动弹: 发你想发的任何内容,任何人都可以发送</li>
                <li>问答区域: 可以提问,如果有访客过来，可以看到，如果有意，访客可以回答</li>
                <li>图片轮播区域: 主要放那，好看的</li>
            </ul>
            <h3>梦想墙</h3>
            <ul>
                <li>写下你的梦想，并为之努力,任何人都可以发。梦想多了，会特别好看</li>
            </ul>
            <h3>经历分享</h3>
            <ul>
                <li>可以在这里分享你的独一无二的经历，梦想底下有供讨论和打分区域</li>
            </ul>
            <h3>IT技术</h3>
            <ul>
                <li>因为我是做技术的，这个就是准备作为一个技术专栏，分享技术</li>
            </ul>
            <h3>聊天机器人</h3>
            <ul>
                <li>任何人都可以过来和机器人聊天(匿名),任何人都可以聊天的哦</li>
            </ul>
        </Card>
    </div>
</template>
<script>
    import {VueEditor} from "vue2-editor";

    export default {
        components: {VueEditor},
    }
</script>