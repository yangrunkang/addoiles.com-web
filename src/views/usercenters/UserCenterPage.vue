<template>
    <div class="web-content-font-size">
        <p style="font-size: xx-large;color: #bababa" v-show="!tipsShow">最近您没有任何动态</p>
        <p style="font-size: xx-large;color: #bababa" v-show="tipsShow">最近活动</p>
        <Card v-show="experienceList.length > 0" class="card-style">
            <p><span class="latest-span">最近</span>分享</p>
            <p class="latest-content" v-for="experience in experienceList" :key="experience.articleId">
                <a v-bind:href="experience.hrefUrl">🏃{{experience.title}}</a>
            </p>
        </Card>

        <Card v-show="itTechList.length > 0" class="card-style">
            <p><span class="latest-span">最近</span>技术分享</p>
            <p class="latest-content" v-for="itTech in itTechList" :key="itTech.articleId">
                💡{{itTech.title}}
            </p>
        </Card>

        <Card v-show="hotsList.length > 0" class="card-style">
            <p><span class="latest-span">最近</span>动弹</p>
            <p class="latest-content" v-for="hots in hotsList" :key="hots.microId">
                🏷 {{hots.content}}
            </p>
        </Card>

        <Card v-show="dreamsList.length > 0" class="card-style">
            <p style="font-weight: bold">DO NOT FORGET YOUR DREAMS&nbsp;<span style="color: #bababa;font-size: 10px">别忘记你的梦想</span></p>
            <p class="latest-content" v-for="dream in dreamsList" :key="dream.microId">
                🏷 {{dream.content}}
            </p>
        </Card>

       <Card v-show="questionList.length > 0" class="card-style">
            <p><span class="latest-span">最近</span>讨论的问题</p>
            <p class="latest-content" v-for="question in questionList" :key="question.questionId">
                🏷 {{question.content}}
            </p>
        </Card>

    </div>
</template>

<script>
    export default {
        name: "my-user-center",
        data(){
            return {
                /*最近*/
                experienceList:[],
                itTechList:[],
                hotsList:[],
                dreamsList:[],
                questionList:[],
                /*提示文字*/
                tipsShow: false
            }
        },
        methods: {
            latest(){
                let latest = {
                    userId: sessionStorage.getItem("userId"),
                    tokenId: sessionStorage.getItem("tokenId")
                };
                this.axios.post("getUserLatest",latest).then(function (response) {
                    if(response.code === 0){
                        let dataSource = response.data;
                        let allArticles = dataSource.articleList;
                        let allMicroContent = dataSource.microContentList;

                        // 获取分享和技术文章
                        for(let i = 0; i < allArticles.length; i++){
                            let article = allArticles[i];
                            if(article.articleType === 0){
                                article.hrefUrl = this.axios.defaults.webSite+'Experience?businessId=' + article.articleId;
                                this.experienceList.push(article);
                            }else if(article.articleType === 2){
                                article.hrefUrl = this.axios.defaults.webSite+'ITTech?businessId=' + article.articleId;
                                this.itTechList.push(article);
                            }
                        }
                        // 获取热门和梦想
                        for(let i = 0; i < allMicroContent.length; i++){
                            let microContent = allMicroContent[i];
                            if(microContent.microType === 0){
                                this.hotsList.push(microContent);
                            }else if(microContent.microType === 1){
                                this.dreamsList.push(microContent);
                            }
                        }
                        //建议或者问题
                        this.questionList = dataSource.questionList;

                        // 是否展示提示文字
                        if(this.experienceList.length > 0
                            || this.experienceList.length > 0
                            || this.itTechList.length > 0
                            || this.dreamsList.length > 0
                            || this.hotsList.length > 0
                            || this.questionList.length > 0){
                            this.tipsShow = true;
                        }
                    }
                }.bind(this))
            }
        },
        mounted () {
            this.latest();
        }
    }
</script>

<style scoped>
    .latest-span {
        font-size: 15px;
        font-weight: bold;
    }

    .latest-content {
        margin-top: 5px;
        font-size: 18px;
        color: rgb(73, 80,	96);
    }

    .card-style {
        margin-top: 6px;
    }
    
    a {
        font-size: 18px;
        color: rgb(73, 80,	96);
    }

</style>