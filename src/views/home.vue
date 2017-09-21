<style scoped lang="less">
	@import "../styles/common.css";
	.row {
		height: inherit;
		width: inherit;
		background: grey;
	}
	
	.main-col {
		height: inherit;
		background: bisque;
	}
	
	.secondary-col {
		height: inherit;
		background: brown;
	}
	
	.carousel{
		height: 400px;
		width: inherit;
		background: green;
	}
</style>
<template>
	<div class="main-content">
		<Row class="row">
			<Col span="18" class="main-col">
                <Carousel
                        v-model="value3"
                        :autoplay="setting.autoplay"
                        :autoplay-speed="setting.autoplaySpeed"
                        :dots="setting.dots"
                        :trigger="setting.trigger"
                        :arrow="setting.arrow">
                    <Carousel-item>
                        <div class="carousel">
                            <img src="../images/logo.png">
                        </div>
                    </Carousel-item>
                    <Carousel-item>
                        <div class="carousel">
                            <img src="../images/one.png">
                        </div>
                    </Carousel-item>
                    <Carousel-item>
                        <div class="carousel">
                            <img src="../images/two.png">
                        </div>
                    </Carousel-item>
                    <Carousel-item>
                        <div class="carousel">
                            <img src="../images/three.png">
                        </div>
                    </Carousel-item>
                </Carousel>


            </Col>
			<Col span="6" class="secondary-col">
				<h2>热门动弹</h2>
				<Card :bordered="true" >
					<p slot="title" style="height: auto;padding-bottom: 2px">
						热门登记
						<Button slot="append">发表</Button>
						</p>
					<p>
						<Input v-model="value13" placeholder="热点提炼" />

						<Input v-model="value6" type="textarea" :rows="4" placeholder="热门描述" />
					</p>
				</Card>
				<br />
				<Card :bordered="true">
					<p slot="title">2017年唯一一次月偏食</p>
					<p>欧洲、非洲、亚洲和澳大利亚部分地区得以观测到2017年唯一一次月偏食。</p>
				</Card>
				<br />
				<Card :bordered="true">
					<p slot="title">2017年唯一一次月偏食</p>
					<p>欧洲、非洲、亚洲和澳大利亚部分地区得以观测到2017年唯一一次月偏食。</p>
				</Card>
				<br />
				<Card :bordered="true">
					<p slot="title">2017年唯一一次月偏食</p>
					<p>欧洲、非洲、亚洲和澳大利亚部分地区得以观测到2017年唯一一次月偏食。</p>
				</Card>
			</Col>
		</Row>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                value3: 0,
                setting: {
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    trigger: 'click',
                    arrow: 'hover'
                }
            }
        },
    }
</script>