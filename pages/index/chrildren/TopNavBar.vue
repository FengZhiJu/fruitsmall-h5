<template>
	<view class="top-nav" v-if="Object.keys(category).length > 0">
		<view class="nav-item" v-for="(v, k, index) in category" :key="k">
			<!-- #ifdef H5 || APP-PLUS -->
			<image class="nav-item-icon" :src="index | setImg" @click="toCategory(index)"></image>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<image class="nav-item-icon" :src="k | setImg(category)" @click="toCategory(index)"></image>
			<!-- #endif -->
			<view>{{k}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {}
		},
		
		props: {
			category: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		methods: {
			toCategory(index){
				uni.setStorageSync('index', index)
				uni.switchTab({
					url: '/pages/category/category'
				})
			}
		},
		
		filters: {
			setImg(index, category){
				// #ifdef MP-WEIXIN
					index = Object.keys(category).indexOf(index);
				// #endif
				return require(`static/topnav/${index}.png`);
			}
		}
		
	}
</script>

<style>
	.top-nav {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 7rpx;
		margin: 20rpx;
		text-align: center;
		font-size: 25rpx;
		color: #666;
	}
	.nav-item {
		position: relative;
		flex: 33.33%;
		margin: 10rpx 0;
	}
	.nav-item-icon {
		width: 85rpx;
		height: 85rpx;
		border-radius: 50%;
	}
</style>
