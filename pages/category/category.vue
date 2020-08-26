<template>
	<view class="category">
		<nav-tab :navList="navList" @toggleTab='toggleTab' :currentIndex="currentIndex"></nav-tab>
		<nav-view :navLabel="navLabel"></nav-view>
	</view>
</template>

<script>
	import NavTab from "./children/NavTab.vue"
	import NavView from "./children/NavView.vue"
	
	import { getHomeBaseData } from "@/network/index.js"
	export default {
		data(){
			return {
				category: [],
				currentIndex: 0,
				navList: []
			}
		},
		
		components: {
			NavTab,
			NavView
		},
		computed:{
			navLabel(){
				return this.category[this.navList[this.currentIndex]]
			}
		},
		methods: {
			toggleTab(index) {
				this.currentIndex = index
			}
		},
		onLoad() {
			getHomeBaseData().then(res => {
				let data = res.data;
				this.category = data.category;
				this.navList = Object.keys(data.category);
			});
		},
		onShow() {
			let index = uni.getStorageSync('index')
			if((index + '') != '') {
				this.currentIndex = index;
			}
			uni.removeStorageSync('index')
		}
		
	}
</script>

<style>
	.category {
		display: flex;
		height: calc(100vh - 95px);
	}
	/* #ifdef MP-WEIXIN */
	.category {
		height: 100vh;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	.category {
		height: 100vh;
	}
	/* #endif */
</style>
