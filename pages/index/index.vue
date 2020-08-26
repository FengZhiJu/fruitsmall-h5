<template>
	<view class="box">
		<top-search></top-search>
		<carousel :carousels="carousels"></carousel>
		<top-nav-bar :category="category"></top-nav-bar>
		<seckill :seckill="seckill"></seckill>
		<recommend :recommend="recommend"></recommend>
		<view class="page-bottom" v-if="!flag">我是有底线的</view>
	</view>
</template>

<script>
	import { getHomeBaseData, getRecommend } from "@/network/index.js"
	
	import TopSearch from "./chrildren/TopSearch.vue"
	import Carousel from "./chrildren/Carousel.vue"
	import TopNavBar from "./chrildren/TopNavBar.vue"
	import Seckill from "./chrildren/Seckill.vue"
	import Recommend from "@/components/recommend/Recommend.vue"
	
	export default {
		data() {
			return {
				carousels: [],
				category: {},
				seckill: [],
				recommend: [],
				flag: true
			}
		},
		components: {
			TopSearch,
			Carousel,
			TopNavBar,
			Seckill,
			Recommend
		},
		onLoad() {
			getHomeBaseData().then(res => {
				let data = res.data;
				this.carousels = data.carousels;
				this.category = data.category;
				this.seckill = data.seckill;
			});
			this.getRecommend(0);
		},
		methods: {
			getRecommend(type){
				if(this.flag) {
					getRecommend().then(res => {
						this.recommend.push(...res.data);
						if(type) this.flag = false;
					})
				}
			}
		},
		
		onReachBottom() {
			this.getRecommend(1);
		}
	}
</script>

<style>
	.box {
		background-color: #f6f6f6;
		padding-bottom: 20rpx;
	}
	.page-bottom {
		font-size: 30rpx;
		text-align: center;
		color: #666;
	}
	
	.page-bottom::after,
	.page-bottom::before{
		display: inline-block;
		content: "";
		width: 150rpx;
		height: 3rpx;
		margin: 0 20rpx;
		background-color: #ccc;
		vertical-align: middle;
	}
</style>
