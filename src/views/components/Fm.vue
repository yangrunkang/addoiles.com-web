<style scoped lang="less">

</style>
<template>
    <div>
        <Card>
            <p slot="title" style="font-size:16px; font-weight: bolder; color: #716769">电台《程序员的生活记录》  目前在网易云音乐/网易云电台,荔枝FM,喜马拉雅,苹果播客可获得收听</p>
            <p  style="text-align: center">
                <iframe frameborder="no"
                        border="0"
                        width=100%
                        height=450 src="//music.163.com/outchain/player?type=4&id=341445058&auto=1&height=430"></iframe>
                <br />
                <br />
                <a style="font-weight: bolder; color: #716769;"
                   href="http://music.163.com/djradio?id=341445058"
                   target="_blank">去网易云音乐电台直接收听《程序员的生活记录》</a>
            </p>
            <br />
            <p style="text-align: right"><a style="color: #9ea7b4;" target="_blank" href="https://t.me/coderLifeLog">《程序员的生活记录》电报(Telegram)讨论组</a></p>
            <br />
        </Card>
        <br />
        <p @click="$store.commit('toJianLi',window)"><Card :bordered="false" >👉个人简历</Card></p>
    </div>
</template>
<script>

</script>